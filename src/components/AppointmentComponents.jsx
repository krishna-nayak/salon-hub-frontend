import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

export function SelectButton({ children, onHandleSelectChange }) {
  return (
    <Select onValueChange={onHandleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Service" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

export function DialogBox({ children }) {
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

export function TimeSlotHandler({ children }) {
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
