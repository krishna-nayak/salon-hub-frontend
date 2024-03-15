import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EditService from "@/pages/EditService";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function MoblieViewService({ selectedService, setSelectedService }) {
  return (
    <div className="flex flex-col gap-2">
      {selectedService?.map((service, idx) => (
        <Card
          key={idx}
          className={cn(
            "font-medium border-l-4 p-3 rounded",
            service?.price && service?.duration
              ? "border-l-green-400"
              : "border-l-red-400"
          )}
        >
          <CardHeader>
            <CardTitle>{service.label}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 p-3">
            <div className="text-xs">
              {service?.description || "Tell about the service. (description)"}
            </div>
            <div className="text-sm">
              {!service?.duration || "Duration: "}
              {service?.duration
                ? service?.duration + " min"
                : "Time take to complete this services in minutes. (duration)"}
            </div>
            <div className="text-sm">Price: ₹{service?.price || 0}</div>
          </CardContent>
          <CardFooter className="flex-col gap-1 p-0">
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default MoblieViewService;
