import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import endpoint from "../../utility/axios";

export default function () {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await endpoint.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Render loading state while fetching user details
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{user.fullName}</h1>
      <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
        <div class="bg-gray-100 ">
          <div className="text-center mt-12">
            <h1 className="text-lg">You have not taken any appointment!</h1>

            <button className="btn w-60 mt-8" type="button">
              Take an appointment
            </button>
          </div>
        </div>
        <div class="bg-gray-100  ">
          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full max-w-full px-3 mb-6  mx-auto">
              <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                  <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                    <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                      <span class="mr-3 font-semibold text-dark">
                        Salon Appointments
                      </span>
                    </h3>
                  </div>

                  <div class="flex-auto block py-8 pt-6 px-9">
                    <div class="overflow-x-auto">
                      <table class="w-full my-0 align-middle text-dark border-neutral-200">
                        <thead class="align-bottom">
                          <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                            <th class="pb-3 text-start min-w-[175px]">
                              NAME OF CUSTOMER
                            </th>
                            <th class="pb-3  min-w-[100px]">DATE</th>
                            <th class="pb-3  min-w-[100px]">DAY</th>
                            <th class="pb-3 pr-12  min-w-[175px]"> PAIED</th>
                            <th class="pb-3 pr-12  min-w-[100px]">AMOUNT</th>
                            <th class="pb-3  min-w-[50px]">TIME</th>
                            <th class="pb-3  min-w-[50px]">STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b border-dashed last:border-b-0">
                            <td class="p-3 pl-0">
                              <div class=" items-center">
                                <div class="flex flex-col justify-start">
                                  <a
                                    href="javascript:void(0)"
                                    class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    {" "}
                                    Olivia Cambell
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                14-2-2024
                              </span>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                Wednesday
                              </span>
                            </td>
                            <td class="p-3 pr-12 ">
                              <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-success bg-success-light rounded-lg">
                                Full Payment
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                ₹ 250
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                10:30 AM
                              </span>
                            </td>
                          </tr>
                          <tr class="border-b border-dashed last:border-b-0">
                            <td class="p-3 pl-0">
                              <div class=" items-center">
                                <div class="flex flex-col justify-start">
                                  <a
                                    href="javascript:void(0)"
                                    class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    Luca Micloe
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                14-2-2024
                              </span>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                Thrusday
                              </span>
                            </td>
                            <td class="p-3 pr-12 ">
                              <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-warning bg-warning-light rounded-lg">
                                Partial Payment
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                ₹ 300
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                10:00 AM
                              </span>
                            </td>
                          </tr>
                          <tr class="border-b border-dashed last:border-b-0">
                            <td class="p-3 pl-0">
                              <div class=" items-center">
                                <div class="flex flex-col justify-start">
                                  <a
                                    href="javascript:void(0)"
                                    class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    {" "}
                                    Rodrige Peak
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td class="p-3 pr-0">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                16-2-2024
                              </span>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                Saturday
                              </span>
                            </td>
                            <td class="p-3 pr-12 ">
                              <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-success bg-success-light rounded-lg">
                                Full Payment
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                ₹ 250
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                2:30 PM
                              </span>
                            </td>
                          </tr>
                          <tr class="border-b border-dashed last:border-b-0">
                            <td class="p-3 pl-0">
                              <div class=" items-center">
                                <div class="flex flex-col justify-start">
                                  <a
                                    href="javascript:void(0)"
                                    class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    Maddy Olte
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                15-2-2024
                              </span>
                            </td>
                            <td class="p-3 pr-0 ">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                Monday
                              </span>
                            </td>
                            <td class="p-3 pr-12 ">
                              <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-warning bg-warning-light rounded-lg">
                                Partial Payment
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                ₹ 200
                              </span>
                            </td>
                            <td class="pr-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                12:30 PM
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
