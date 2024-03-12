import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditService({ service, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const updated = selected.map((obj) => {
      if (obj.id === service.id)
        return {
          ...obj,
          price: data.price,
          duration: data.duration,
          description: data.description,
        };

      return obj;
    });

    setSelected(updated);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          Edit Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service ({service.label})</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form id="service-edit">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration<sup>*</sup>
                <br /> (in minutes)
              </Label>
              <Input
                id="duration"
                type="text"
                className={cn(
                  "col-span-3",
                  errors?.duration ? "border-red-300" : ""
                )}
                {...register("duration", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount<sup>*</sup>
              </Label>
              <Input
                id="amount"
                className={cn(
                  "col-span-3",
                  errors?.price ? "border-red-300" : ""
                )}
                {...register("price", { required: true })}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="button"
            form="service-edit"
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
