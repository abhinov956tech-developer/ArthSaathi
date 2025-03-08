import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const PrivacySecuritySettings = (closeModal) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle password change logic
    console.log("Password changed successfully!");
    closeModal(); // Close the modal after successful submission
  };

  return (
    <div className="flex">
      <SettingsSidebar />

      <div className="mt-28 ml-9 flex flex-col gap-6">
        <div className="mb-8">
          <h1 className="text-[18px] font-semibold">Privacy and Security</h1>
          <p className="text-[14px] text-[#727272]">
            Manage your Privacy and Security settings effortlessly. Ensure your
            personal information stays safe with robust, user-friendly tools.
          </p>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-row gap-20 items-center justify-center">
          <p>Email Address</p>
          <Input className="w-[364px] h-[38px] bg-white text-black" />
          </div>
          <div className="ml-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#F3F3F3] shadow-none border-none text-[#1976D2]"
                  variant="outline"
                >
                  Change Email
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="border-b border-gray-500">
                  <h1 className="mb-1">Change Email Address</h1>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <p>Password</p>
                    <Input
                      className="bg-white"
                      placeholder="Confirm Current Password"
                    />
                  </div>
                  <div>
                    <p>New Email Address</p>
                    <Input className="bg-white" placeholder="you@domain.com" />
                  </div>
                </div>

                <div>
                  <p>A confirmation email will be sent to this address</p>

                  <div></div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-row gap-24 items-center">
          <p>Password</p>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#F3F3F3] shadow-none border-none text-[#1976D2]"
                  variant="outline"
                >
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="border-b border-gray-500">
                  <h1 className="mb-1">Change Your Password</h1>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <p>Old Password</p>
                    <Input className="bg-white" />
                  </div>
                  <div>
                    <p>New Password</p>
                    <Input className="bg-white" />
                  </div>
                  <div>
                    <p>Confirm New Password</p>
                    <Input className="bg-white" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-10">
            <h1>To Step Verification</h1>
            <p className="text-[14px] text-[#727272]">Two-Step Verification is not enabled</p>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-[#1976D2] ml-44 text-[14px]"
                >
                  Enable
                </button>
              </DialogTrigger>
              <DialogContent className="w-[608px]">
                <div className="border-b">
                  <h1 className="text-black text-[20px]">
                    2 Step Verification
                  </h1>
                </div>

                <div>
                  <p className="text-[14px] text-[#868686]">
                    Each time you login, in addition of your password, you'll
                    use an authenticator app to generate an one time password
                  </p>
                </div>

                <div>
                  <div className="flex flex-row gap-4">
                    <Badge className="bg-slate-100 w-[73px] h-[35px] text-center items-center justify-center border border-black rounded-full text-black">
                      Step 1
                    </Badge>
                    <p className="text-black text-[20px]">Scan QR Code</p>
                  </div>
                  <p className="text-[12px] text-[#868686]">
                    Scan the QR Code below or manually enter the secret key into
                    your authenticator app.
                  </p>
                </div>
                <div>
                  <div className="flex flex-row gap-4">
                    <Badge className="bg-slate-100 w-[73px] h-[35px] text-center items-center justify-center border border-black rounded-full text-black">
                      Step 2
                    </Badge>
                    <p className="text-black text-[20px]">
                      Get Verification Code
                    </p>
                  </div>
                  <p className="text-[12px] text-[#868686]">
                    Enter the 6-digit code you see in your authenticator app.
                  </p>
                </div>

                <div>
                  <p>Enter Verification Code</p>
                  <div>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecuritySettings;
