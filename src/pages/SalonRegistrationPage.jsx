import FancyMultiSelect from "@/components/ui/Dropdown/FancyMultiSelect";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import UseGet from "@/hooks/fetch/useGet";
import { cn } from "@/lib/utils";
import endpoint from "@/utility/axios";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";

// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
const FRAMEWORKS = [
  { id: "1", value: "hair cut", label: "Hair Cut" },
  { id: "2", value: "hair color", label: "Hair Color" },
  { id: "3", value: "manicure", label: "Manicure" },
  { id: "4", value: "pedicure", label: "Pedicure" },
  { id: "5", value: "facial", label: "Facial" },
  { id: "6", value: "massage", label: "Massage" },
];

const CITY = [
  "Bhubneswar",
  "Delhi",
  "Bangarulu",
  "Hydrabad",
  "Mumbai",
  "Kolkata",
];

const SalonRegistrationPage = () => {
  const [selectedService, setSelectedService] = useState([]);
  const [city, setCity] = useState("");
  const navigateTo = useNavigate();
  const SERVICE_DATA = UseGet();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const hasPriceAndDuration = selectedService.every(
      (object) => object.price && object.duration
    );
    if (selectedService.length === 0) {
      alert("Please select at least one service");
      return; // Stop submission
    }
    if (hasPriceAndDuration) {
      const gatherData = { ...data, city };
      const services = { services: selectedService };

      const formData = new FormData();

      formData.append("name", gatherData.name);
      formData.append("description", gatherData.description);
      formData.append("address", gatherData.address);
      formData.append("city", gatherData.city);
      formData.append("openingHourStart", gatherData.openingHourStart);
      formData.append("closeingHour", gatherData.closingHour);
      // formData.append("files", file);
      formData.append("email", gatherData.email);

      const salon_response = await endpoint.post(`/salon`, formData);
      const service_id = salon_response.data?.salonId;
      const service_response = await endpoint.post(
        `/salon/${service_id}/services`,
        services
      );

      console.log("complete", service_response);
      navigateTo("/");
    } else {
      // alert("service needs to be updated");
    }
  };
  return (
    <section className=" max-w-[80%] lg:max-w-[60%] mx-auto">
      <h1 className="text-4xl font-bold py-10">Salon Registration</h1>
      <form
        id="salon-registration"
        className="space-y-3 counter px-8 border-l"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Registration
        </h3>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Salon Name</Label>
          <Input
            id="name"
            placeholder="Shop Name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Enter only alphabets",
              },
            })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <Alert variant="destructive">
              <CiCircleAlert />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.name.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="user@gmail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <Alert variant="destructive">
              <CiCircleAlert />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.email.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Textarea
            placeholder="Type your message here."
            id="address"
            {...register("address", {
              required: "Address is required",
              maxlength: {
                value: 100,
                message: "Address should not exceed 100 characters",
              },
            })}
            aria-invalid={errors.address ? "true" : "false"}
          />
          {errors.address && (
            <Alert variant="destructive">
              <CiCircleAlert />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.address.message}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex gap-5 flex-col sm:flex-row sm:h-16 xs:space-x-4 text-sm justify-between">
          <div className="basis-full">
            <Label htmlFor="city">City</Label>
            <Select onValueChange={(v) => setCity(v)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent {...register("city")}>
                <SelectGroup>
                  <SelectLabel>City</SelectLabel>
                  {CITY.map((city, idx) => (
                    <SelectItem key={idx} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator orientation="vertical" />

          <div className="basis-full">
            <Label htmlFor="date">Opening Hour</Label>
            {/* <DatePickerDemo /> */}
            <Input
              type="time"
              className={errors.openingHour ? "border-red-400" : ""}
              {...register("openingHour", { required: true })}
            />
          </div>
          <Separator orientation="vertical" />
          <div className="basis-full">
            <Label htmlFor="date">Closing Hour</Label>
            <Input
              type="time"
              className={errors.closingHour ? "border-red-400" : ""}
              {...register("closingHour", { required: true })}
            />
          </div>
        </div>

        <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
          Services
        </h3>

        <div>
          <FancyMultiSelect
            selected={selectedService}
            setSelected={setSelectedService}
            options={SERVICE_DATA}
          />
          <Table className="mt-4">
            <TableCaption>A list of your services.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="w-[30%]">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedService?.map((service, idx) => (
                <TableRow key={idx}>
                  <TableCell
                    className={cn(
                      "font-medium border-l-4",
                      service?.price && service?.duration
                        ? "border-l-green-400"
                        : "border-l-red-400"
                    )}
                  >
                    {service.label}
                  </TableCell>
                  <TableCell>
                    {service?.duration ||
                      "Time take to complete this services in minutes."}
                  </TableCell>
                  <TableCell>
                    {service?.description || "Tell about the service."}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{service?.price || 0}
                  </TableCell>
                  <TableCell>
                    {/* className="flex justify-evenly items-center" */}
                    <div className="space-y-1">
                      <EditService
                        service={service}
                        selected={selectedService}
                        setSelected={setSelectedService}
                      />
                      <Separator />
                      <Button
                        type="button"
                        variant="destructive"
                        className="w-full"
                        onClick={(e) => {
                          // const variable = service.id;
                          const filteredSelect = selectedService?.filter(
                            (item) => item.id !== service.id
                          );

                          setSelectedService(filteredSelect);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <h3 className="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
          Upload image of Store (Optional)
          <div>
            <Label htmlFor="date">Images</Label>
            <Input type="file" {...register("fileInput")} />
          </div>
        </h3>

        <Button type="submit" form="salon-registration">
          Register
        </Button>
      </form>
    </section>
  );
};

export default SalonRegistrationPage;

function EditService({ service, selected, setSelected }) {
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
                Duration
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
                Amount
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
