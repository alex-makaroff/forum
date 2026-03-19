import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Clock, Loader2, Minus, Plus, X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface BookingModalProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const russianDigits = digits.startsWith("7") ? digits : "7" + digits.replace(/^8/, "");
  const limited = russianDigits.slice(0, 11);
  
  let formatted = "+7";
  if (limited.length > 1) {
    formatted += " (" + limited.slice(1, 4);
  }
  if (limited.length > 4) {
    formatted += ") " + limited.slice(4, 7);
  }
  if (limited.length > 7) {
    formatted += "-" + limited.slice(7, 9);
  }
  if (limited.length > 9) {
    formatted += "-" + limited.slice(9, 11);
  }
  return formatted;
}

interface CustomCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  disabled?: (date: Date) => boolean;
}

function CustomCalendar({ selected, onSelect, disabled }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDayOfWeek = monthStart.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  const canGoPrev = !isBefore(subMonths(currentMonth, 1), startOfMonth(new Date()));
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-serif text-lg font-medium capitalize">
          {format(currentMonth, "LLLL yyyy", { locale: ru })}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: adjustedStartDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {days.map((day) => {
          const isSelected = selected && isSameDay(day, selected);
          const isDisabled = disabled?.(day) ?? false;
          const isTodayDate = isToday(day);
          
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(day)}
              className={cn(
                "aspect-square flex items-center justify-center rounded-full text-sm transition-all",
                "hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#838681] focus:ring-offset-1",
                isSelected && "bg-[#838681] text-white hover:bg-[#6b6e69]",
                !isSelected && isTodayDate && "ring-1 ring-[#838681]",
                isDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingModal({ trigger }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consent, setConsent] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      date: "",
      time: "",
      guests: "2",
      name: "",
      phone: "",
      comment: "",
    },
  });

  const guests = parseInt(form.watch("guests") || "1", 10);

  async function onSubmit(values: InsertBooking) {
    if (!consent) return;
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/booking", values);
      setIsSuccess(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить заявку. Пожалуйста, позвоните нам.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setOpen(false);
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
        setConsent(false);
      }, 300);
    }
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) {
      handleClose();
    } else {
      setOpen(true);
    }
  }

  const incrementGuests = () => {
    const current = parseInt(form.getValues("guests") || "1", 10);
    if (current < 20) {
      form.setValue("guests", String(current + 1));
    }
  };

  const decrementGuests = () => {
    const current = parseInt(form.getValues("guests") || "1", 10);
    if (current > 1) {
      form.setValue("guests", String(current - 1));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Забронировать стол</Button>}
      </DialogTrigger>
      <DialogContent 
        hideCloseButton
        className="sm:max-w-[560px] p-0 gap-0 bg-[#F6F6F4] border-[#D8D8D2] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#838681] flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-3">Заявка отправлена</h2>
            <p className="text-muted-foreground mb-8">
              Мы свяжемся для подтверждения брони.
            </p>
            <Button 
              onClick={handleClose}
              className="h-12 px-8 rounded-full bg-[#838681] hover:bg-[#6b6e69] text-white"
            >
              Понятно
            </Button>
          </div>
        ) : (
          <>
            <div className="relative p-6 pb-4 border-b border-[#D8D8D2]">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
              <DialogHeader className="text-left">
                <DialogTitle className="font-serif text-2xl font-semibold">Бронирование</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  Оставьте контакты — подтвердим бронь по телефону
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs font-medium text-muted-foreground mb-1.5">Дата</FormLabel>
                          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  className={cn(
                                    "flex h-11 w-full items-center justify-between rounded-lg border border-[#D8D8D2] bg-white px-3 text-sm transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-[#838681] focus:border-transparent",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "d MMMM", { locale: ru })
                                  ) : (
                                    <span>Выберите</span>
                                  )}
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                </button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white border-[#D8D8D2] rounded-xl shadow-lg" align="start">
                              <CustomCalendar
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                  field.onChange(format(date, "yyyy-MM-dd"));
                                  setDatePickerOpen(false);
                                }}
                                disabled={(date) => isBefore(date, startOfDay(new Date()))}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs font-medium text-muted-foreground mb-1.5">Время</FormLabel>
                          <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  className={cn(
                                    "flex h-11 w-full items-center justify-between rounded-lg border border-[#D8D8D2] bg-white px-3 text-sm transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-[#838681] focus:border-transparent",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value || <span>Выберите</span>}
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                </button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2 bg-white border-[#D8D8D2] rounded-xl shadow-lg max-h-64 overflow-y-auto" align="start">
                              <div className="grid gap-1">
                                {timeSlots.map((time) => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => {
                                      field.onChange(time);
                                      setTimePickerOpen(false);
                                    }}
                                    className={cn(
                                      "px-3 py-2 text-sm rounded-lg text-left transition-colors",
                                      field.value === time
                                        ? "bg-[#838681] text-white"
                                        : "hover:bg-neutral-100"
                                    )}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground">Количество гостей</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4 mt-1.5">
                            <button
                              type="button"
                              onClick={decrementGuests}
                              disabled={guests <= 1}
                              className="h-11 w-11 rounded-lg border border-[#D8D8D2] bg-white flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-lg font-medium min-w-[3rem] text-center">{guests}</span>
                            <button
                              type="button"
                              onClick={incrementGuests}
                              disabled={guests >= 20}
                              className="h-11 w-11 rounded-lg border border-[#D8D8D2] bg-white flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <input type="hidden" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground">Имя</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ваше имя" 
                            {...field}
                            className="h-11 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground">Телефон</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+7 (___) ___-__-__"
                            type="tel"
                            {...field}
                            onChange={(e) => handlePhoneChange(e, field.onChange)}
                            className="h-11 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground">Комментарий (необязательно)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="resize-none h-20 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent" 
                            {...field} 
                            value={field.value || ""} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox 
                      id="consent" 
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked === true)}
                      className="mt-0.5 border-[#D8D8D2] data-[state=checked]:bg-[#838681] data-[state=checked]:border-[#838681]"
                    />
                    <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      Я согласен на обработку персональных данных в соответствии с{" "}
                      <Link href="/privacy" className="underline hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                        политикой конфиденциальности
                      </Link>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-full bg-[#838681] hover:bg-[#6b6e69] text-white text-base font-medium mt-2" 
                    disabled={isSubmitting || !consent}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      "Забронировать"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
