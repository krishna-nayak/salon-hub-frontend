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
import EditService from "@/pages/EditService";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function TableServiceComponent({
  selectedService,
  setSelectedService,
  extraFunction,
}) {
  return (
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
            <TableCell className="text-right">₹{service?.price || 0}</TableCell>
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
                    const filteredSelect = selectedService?.filter(
                      (item) => item.id !== service.id
                    );
                    setSelectedService(filteredSelect);
                    if (typeof extraFunction === "function") {
                      extraFunction(service.serviceId);
                    }
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
  );
}

export default TableServiceComponent;
