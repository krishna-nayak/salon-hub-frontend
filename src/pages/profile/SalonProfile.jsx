import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UseGet from "@/hooks/fetch/useGet";
import endpoint from "@/utility/axios";
import FancyMultiSelect from "@/components/ui/Dropdown/FancyMultiSelect";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MoblieViewService from "@/components/MoblieViewService";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableServiceComponent from "@/components/TableServiceComponent";
import useScreenSize from "@/hooks/useSize";

// import UseGetProfile from "@/hooks/fetch/useGetProfile";

const CITY = [
  "Bhubneswar",
  "Delhi",
  "Bangarulu",
  "Hydrabad",
  "Mumbai",
  "Kolkata",
];
export default function () {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState([]);
  const [salonDetails, setSalonDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(true);
  const SERVICE_DATA = UseGet();
  const size = useScreenSize();

  useEffect(() => {
    async function fetchSalonService() {
      const salonId = localStorage.getItem("salonId");
      if (salonId === undefined) {
        localStorage.removeItem("salonId");
        localStorage.removeItem("userid");
        return navigate("/login");
      }
      const res = await endpoint.get(`/salon/${salonId}`);
      // console.log("result", res.data);
      const results = res?.data?.Services;
      setSalonDetails(res?.data);
      // console.log(results);
      let service_opt = [];
      let i = 0;
      for (let result of results) {
        let renamedObject = Object.assign(
          {},
          {
            id: i++,
            value: result.service_type.replace(/\b\w/g, (c) => c.toUpperCase()),
            label: result.service_type.replace(/\b\w/g, (c) => c.toUpperCase()),
            serviceId: result.serviceId,
            price: null,
            duration: result?.SalonService.duration,
            description: result?.SalonService.description || "No description",
            price: result?.SalonService.price,
          }
        );

        service_opt.push(renamedObject);
      }
      setSelectedService(service_opt);
    }
    if (isSubmitting) {
      fetchSalonService();
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const notSelectedServices = SERVICE_DATA.filter((service) => {
    return !selectedService.find(
      (selected) => selected.serviceId === service.serviceId
    );
  });

  const handleSalonServiceDelete = async (serviceId) => {
    const salonId = localStorage.getItem("salonId");
    console.log(serviceId);
    try {
      await endpoint.delete(`/salonService/${salonId}/delete/${serviceId}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <section>
        <div>
          name: {salonDetails.name || ""}
          <br />
          address: {salonDetails.address || ""}
          <br />
          city: {salonDetails.city || ""}
          <br />
          openings: {salonDetails.openingHourStart}
          <br />
          closing: {salonDetails.closeingHour}
          <div></div>
          {size.width > 690 ? (
            <TableServiceComponent
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              extraFunction={handleSalonServiceDelete}
            />
          ) : (
            <MoblieViewService
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              extraFunction={handleSalonServiceDelete}
            />
          )}
          <div></div>
          <AddNewService
            service_data={notSelectedServices}
            setIsSubmitting={setIsSubmitting}
          />
        </div>
      </section>
    </div>
  );
}

function AddNewService({ service_data, setIsSubmitting }) {
  const [newSelectedService, setNewSelectedService] = useState([]);
  const handleSubmit = async (data) => {
    const hasPriceAndDuration = newSelectedService.every(
      (object) => object.price && object.duration
    );
    if (newSelectedService.length === 0) {
      alert("Please select at least one service");
      return; // Stop submission
    }
    if (hasPriceAndDuration) {
      const services = { services: newSelectedService };
      const salonId = localStorage.getItem("salonId");
      const service_response = await endpoint.post(
        `/salon/${salonId}/services`,
        services
      );
      console.log("complete", service_response);
      setIsSubmitting(true);
    } else {
      alert("service needs to be updated");
    }
  };
  return (
    <>
      <ServiceModal handleSubmit={handleSubmit}>
        <div>
          <FancyMultiSelect
            selected={newSelectedService}
            setSelected={setNewSelectedService}
            options={service_data}
          />
        </div>
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Service</h4>
            <MoblieViewService
              selectedService={newSelectedService}
              setSelectedService={setNewSelectedService}
            />
          </div>
        </ScrollArea>
      </ServiceModal>
    </>
  );
}

function ServiceModal({ children, handleSubmit }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Service</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Add
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
