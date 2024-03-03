import { cn } from "@/lib/utils";
import { DatePickerWithPresets } from "@/components/ui/DatePicker/DatePickerWithPresets";
import { addMinutes, format, isAfter, set } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  capitalizeAllWords,
  createDateFormat,
  createDateFromTime,
  createDateFromTimeAmPm,
} from "@/utility/convert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarClock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { add } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useTime } from "@/hooks/context/TimeContext";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import UseFetchAppointments from "@/hooks/fetch/useFetchAppointments";
import { useForm } from "react-hook-form";
import endpoint from "@/utility/axios";

import { useNavigate } from "react-router-dom";

function SelectButton({ children, onHandleSelectChange }) {
  return (
    <Select onValueChange={onHandleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Service" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

function DialogBox({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <CalendarClock />
          Time Slot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Time Slot</DialogTitle>
          <DialogDescription>
            Selete your preferable time slot
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TimeSlotHandler({ children }) {
  return (
    <Tabs defaultValue="morning" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="morning">Morning</TabsTrigger>
        <TabsTrigger value="noon">Noon</TabsTrigger>
        <TabsTrigger value="evening">Evening</TabsTrigger>
      </TabsList>
      {children}
      {/* <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
  );
}

const CardHander = React.memo(({ name, date, duration, salonDetails }) => {
  // console.count("Render - CardHander");

  const getBookTime = () => {
    const timeIntervals = [];
    const bookTimes = UseFetchAppointments(salonDetails?.salonId, date);
    // console.log(bookTimes);
    for (let i = 0; i < bookTimes.length; i++) {
      const obj = bookTimes[i];
      let startTime = new Date(obj.time);
      let interval = obj.totalDuration;

      let endTime = addMinutes(startTime, interval);

      while (isAfter(endTime, startTime)) {
        timeIntervals.push(format(startTime, "hh:mm"));
        startTime = addMinutes(startTime, 30);
      }
    }

    return timeIntervals;
  };

  const getTimes = () => {
    let startTime;
    let endTime;
    const opening = salonDetails?.openingHourStart || "";
    const closing = salonDetails?.closeingHour || "";
    const isOpening = createDateFromTimeAmPm(opening);
    const isClosing = createDateFromTimeAmPm(closing);
    // console.log(isOpening, isClosing);
    // const isOpening = 0; // index ["morning", "noon", "evening"]
    // const isClosing = 0; // index ["morning", "noon", "evening"]
    switch (name) {
      case "Morning":
        if (isOpening.timeSlot === 0) {
          startTime = isOpening.date;
          endTime = new Date();
          endTime.setHours(12, 0, 0);
        }
        if (isClosing.timeSlot === 0) {
          endTime = isClosing.timeSlot;
        }
        break;
      case "Noon":
        if (isOpening.timeSlot === 1 && isClosing.timeSlot > 0) {
          startTime = isOpening.date;
          endTime = new Date();
          endTime.setHours(17, 0, 0);
          console.log("noon-open");
        } else if (isOpening.timeSlot === 2) {
        } else {
          startTime = new Date();
          startTime.setHours(12, 0, 0);
          endTime = new Date();
          endTime.setHours(17, 0, 0);
        }

        if (isClosing.timeSlot === 1) {
          endTime = isClosing.date;
          endTime.setSeconds(0);
        }

        break;
      case "Evening":
        if (isOpening.timeSlot === 2 && isClosing.timeSlot > 1) {
          startTime = isOpening.date;
          endTime = new Date();
          endTime.setHours(8, 0, 0);
        } else {
          startTime = new Date();
          startTime.setHours(17, 0, 0);
          endTime = new Date();
          endTime.setHours(21, 0, 0);
        }
        if (isClosing.timeSlot === 2) {
          endTime = isClosing.date;
          endTime.setSeconds(0);
        }

        break;
      default:
        break;
    }
    if (!startTime || !endTime) return [];

    const timeIntervals = [];
    while (isAfter(endTime, startTime)) {
      timeIntervals.push(startTime);
      startTime = addMinutes(startTime, 30);
    }
    return timeIntervals;
  };
  const times = getTimes();
  const bookedTime = getBookTime();
  // console.log(times);
  // console.log(bookedTime);
  const slotCanBeBook = (startTime) => {
    return bookedTime?.includes(format(startTime, "hh:mm a")) ? false : true;
  };

  const { setTime, time } = useTime();
  const [flag, setFlag] = React.useState(time);

  const onSubmit = (time) => {
    console.log(time);
    const totalDuration = duration;

    let startTime = createDateFromTimeAmPm(time).date;
    let endTime = addMinutes(startTime, totalDuration);
    console.log(startTime);
    let result;
    const slotRequired = [];
    while (isAfter(endTime, startTime)) {
      slotRequired.push(format(startTime, "hh:mm"));
      result = slotCanBeBook(startTime);
      if (!result) break;
      startTime = addMinutes(startTime, 30);
    }
    console.log(result);
    if (!result) return alert("can't book as time slot is not feet");

    setTime(time);
    setFlag(time);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{name} Appointment slot list.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-4 place-items-center gap-2">
          {times.map((time, i) => (
            <div key={`time-${i}`}>
              <Badge
                variant={
                  format(time, "hh:mm a") == flag &&
                  !bookedTime?.includes(format(time, "hh:mm a"))
                    ? ""
                    : "secondary"
                }
                className={cn(
                  bookedTime?.includes(format(time, "hh:mm a"))
                    ? "text-gray-300"
                    : ""
                )}
                onClick={() => {
                  // if (!slotCanBeBook(time)) return;

                  onSubmit(format(time, "hh:mm a'"));
                }}
              >
                {format(time, "hh:mm")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
});

function Appointment({ salonDetails }) {
  // console.count("Render - Appointment");

  const navigate = useNavigate();

  const { time, setTime } = useTime();
  const [date, setDate] = React.useState(new Date());
  const [selectService, setService] = React.useState(null);

  const onHandleSelectChange = (v) => {
    const services = salonDetails?.Services;
    const filter = services.filter(
      (service) => service.SalonService.salonServiceId === v
    );
    if (filter.length > 0) {
      setService(filter[0].SalonService);
      setTime("");
    }
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if (time == "") return;

    const responde_date = {
      ...data,
      date: createDateFormat(date),
      time,
      salonServiceIdArr: [selectService?.salonServiceId],
      duration: selectService.duration,
      notes: "",
    };

    // console.log(responde_date);

    const userId = localStorage.getItem("userId");

    if (!userId)
      return console.error("USER ID is not set. PLEASE TRY TO LOGIN FIRST");

    const result = await endpoint.post(
      `/appointment/${userId}/salonService`,
      responde_date
    );
    console.log("result: ", result);
    navigate("/");
  };
  return (
    <form
      className={cn("grid items-start gap-4 p-4")}
      onSubmit={handleSubmit(onSubmit)}
      id="appoint"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="shadcn"
          {...register("name")}
        />
      </div>
      <div className="grid gap-2">
        <div>Gender</div>
        <div className="flex justify-between gap-2">
          <Label htmlFor="male" className="basis-full">
            <Input
              type="radio"
              id="male"
              name="gender"
              className="peer sr-only"
              value="male"
              {...register("gender")}
            />
            <Button
              variant="outline"
              className="peer-checked:text-white peer-checked:bg-black dark:peer-checked:text-black dark:peer-checked:bg-white w-full"
              asChild
            >
              <div>Male</div>
            </Button>
          </Label>
          <Label htmlFor="female" className="basis-full">
            <Input
              type="radio"
              id="female"
              name="gender"
              className="peer sr-only"
              value="female"
              {...register("gender")}
            />
            <Button
              variant="outline"
              className="peer-checked:text-white peer-checked:bg-black dark:peer-checked:text-black dark:peer-checked:bg-white w-full"
              asChild
            >
              <div>Female</div>
            </Button>
          </Label>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date">Service</Label>
        <SelectButton onHandleSelectChange={onHandleSelectChange}>
          {salonDetails?.Services?.map((service, idx) => (
            <SelectItem value={service?.SalonService.salonServiceId} key={idx}>
              {capitalizeAllWords(service.service_type)}
            </SelectItem>
          ))}
        </SelectButton>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <DatePickerWithPresets setDate={setDate} date={date} />
      </div>

      {selectService?.duration && (
        <div className="flex gap-2 items-center justify-between">
          <Label htmlFor="date">Time: {time == "" ? "--:-- xx" : time}</Label>
          <DialogBox>
            <TimeSlotHandler>
              {["Morning", "Noon", "Evening"].map((name, id) => (
                <TabsContent key={id} value={name.toLowerCase()}>
                  <CardHander
                    name={name}
                    salonDetails={salonDetails}
                    date={date}
                    duration={selectService?.duration}
                  />
                </TabsContent>
              ))}
            </TimeSlotHandler>
          </DialogBox>
        </div>
      )}
    </form>
  );
}

export default React.memo(Appointment);
