import SettingsSidebar from "@/components/settings/SettingsSidebar";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HelpandSupportSettings = () => {
  return (
    <div className="flex">
      <SettingsSidebar />

      <div className="my-24 mx-10">
        <div className="mb-8">
          <h1 className="text-[18px] font-semibold">Help and Support</h1>
          <p className="text-[14px] text-[#727272]">
            Easily manage your queries and access assistance with our Help and
            Support settings. Find FAQs, contact options in one place.
          </p>
        </div>

        {/* FAQ */}
        <div className="flex w-full">
          <Accordion type="single" collapsible className="w-full">
            <div className="flex flex-col gap-2.5">
            <div className="border rounded-md shadow-none bg-white">
              <AccordionItem value="item-1">
                <div className="ml-4 mr-4">
                <AccordionTrigger>What should I do if I suspect unauthorized access to my account?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
                </div>
              </AccordionItem>
            </div>
            <div className="border rounded-md shadow-none bg-white">
              <AccordionItem value="item-2">
                <div className="ml-4 mr-4">
                <AccordionTrigger>What should I do if I suspect unauthorized access to my account?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
                </div>
              </AccordionItem>
            </div>
            <div className="border rounded-md shadow-none bg-white">
              <AccordionItem value="item-3">
                <div className="ml-4 mr-4">
                <AccordionTrigger>What should I do if I suspect unauthorized access to my account?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
                </div>
              </AccordionItem>
            </div>
            <div className="border rounded-md shadow-none bg-white">
              <AccordionItem value="item-4">
                <div className="ml-4 mr-4">
                <AccordionTrigger>What should I do if I suspect unauthorized access to my account?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
                </div>
              </AccordionItem>
            </div>
            <div className="border rounded-md shadow-none bg-white">
              <AccordionItem value="item-5">
                <div className="ml-4 mr-4">
                <AccordionTrigger>What should I do if I suspect unauthorized access to my account?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
                </div>
              </AccordionItem>
            </div>
            <div className="border rounded-md shadow-none bg-white">
              <AccordionItem value="item-6">
                <div className="ml-4 mr-4">
                <AccordionTrigger>What should I do if I suspect unauthorized access to my account?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
                </div>
              </AccordionItem>
            </div>
            </div>
          </Accordion>
        </div>

        {/* SubsCribe */}
        <div className="flex flex-row gap-96 w-full h-[200px] bg-[#393939] rounded-md mt-10">
          <div className="flex flex-col m-6 mt-20 mb-11">
            <h1 className="text-white text-[18px]">Join 2k+ Subscribers</h1>
            <p className="text-[12px] text-white">Stay in loop with every thing you need to know.</p>
          </div>

          <div className="mt-16 mb-7">
            <p className="text-[12px] text-white">Email</p>
            <div className="flex flex-row gap-2">
            <Input className="bg-white rounded-md w-64"/>
            <Button className="bg-black text-white">Subscribe</Button>
            </div>
            <p className="text-[12px] text-white">Enter your email address</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpandSupportSettings;