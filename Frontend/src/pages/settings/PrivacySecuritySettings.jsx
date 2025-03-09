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
import QRCode from 'react-qr-code'; // You'll need to install this package

const PrivacySecuritySettings = ({ closeModal }) => {
  // Fixed: Added missing curly braces for the closeModal prop
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Sample 2FA secret key for demo purposes
  const twoFASecretKey = "JBSWY3DPEHPK3PXP";

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    
    // Handle password change logic
    console.log("Password changed successfully!");
    setDialogOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeEmail = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    console.log("Email changed successfully!");
    setDialogOpen(false);
  };

  const handleVerifyTwoFactor = () => {
    if (verificationCode.length !== 6) {
      alert("Please enter a valid 6-digit verification code");
      return;
    }
    
    console.log("Two-factor authentication enabled successfully!");
    setDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SettingsSidebar />

      <div className="flex-1 p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Privacy and Security</h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your Privacy and Security settings effortlessly. Ensure your
            personal information stays safe with robust, user-friendly tools.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Email Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6">
            <div className="flex flex-col">
              <h2 className="font-medium text-gray-700">Email Address</h2>
              <p className="text-gray-500 text-sm">your.email@example.com</p>
            </div>
            <Dialog open={dialogOpen === "email"} onOpenChange={(open) => open ? setDialogOpen("email") : setDialogOpen(false)}>
              <DialogTrigger asChild>
                <Button
                  className="mt-2 md:mt-0 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  variant="outline"
                >
                  Change Email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium">Change Email Address</h3>
                  <p className="text-sm text-gray-500 mt-1">Update your email address and verify the new one</p>
                </div>

                <div className="space-y-4 py-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-white"
                      placeholder="Enter your current password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-1">New Email Address</label>
                    <Input
                      id="new-email"
                      type="email"
                      className="bg-white"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <p className="text-sm text-gray-500">A confirmation email will be sent to this address</p>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleChangeEmail}>
                    Update Email
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Password Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6">
            <div className="flex flex-col">
              <h2 className="font-medium text-gray-700">Password</h2>
              <p className="text-gray-500 text-sm">Last updated 30 days ago</p>
            </div>
            <Dialog open={dialogOpen === "password"} onOpenChange={(open) => open ? setDialogOpen("password") : setDialogOpen(false)}>
              <DialogTrigger asChild>
                <Button
                  className="mt-2 md:mt-0 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  variant="outline"
                >
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium">Change Your Password</h3>
                  <p className="text-sm text-gray-500 mt-1">Ensure it's at least 8 characters with a mix of letters and numbers</p>
                </div>

                <div className="space-y-4 py-4">
                  <div>
                    <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <Input
                      id="old-password"
                      type="password"
                      className="bg-white"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-white"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="bg-white"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePasswordChange}>
                    Change Password
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pt-2">
            <div className="flex flex-col">
              <h2 className="font-medium text-gray-700">Two-Step Verification</h2>
              <p className="text-gray-500 text-sm">Two-Step Verification is not enabled</p>
            </div>
            <Dialog open={dialogOpen === "2fa"} onOpenChange={(open) => open ? setDialogOpen("2fa") : setDialogOpen(false)}>
              <DialogTrigger asChild>
                <Button
                  className="mt-2 md:mt-0 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  variant="outline"
                >
                  Enable
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium">Two-Step Verification</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Each time you login, in addition to your password, you'll
                    use an authenticator app to generate a one-time password
                  </p>
                </div>

                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full">
                        Step 1
                      </Badge>
                      <h4 className="text-base font-medium">Scan QR Code</h4>
                    </div>
                    <p className="text-sm text-gray-500">
                      Scan the QR Code below with Google Authenticator, Authy, or any other authenticator app.
                    </p>
                    
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg mt-4">
                      <div className="bg-white p-4 rounded">
                        {/* Replace with actual QRCodeSVG component if available */}
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                          <p className="text-sm text-gray-500"><QRCode value={twoFASecretKey} />r</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500">Or enter this code manually:</p>
                        <p className="font-mono mt-1 bg-gray-100 p-2 rounded select-all">
                          {twoFASecretKey}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full">
                        Step 2
                      </Badge>
                      <h4 className="text-base font-medium">Enter Verification Code</h4>
                    </div>
                    <p className="text-sm text-gray-500">
                      Enter the 6-digit code you see in your authenticator app.
                    </p>
                    
                    <div className="mt-4">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        Verification Code
                      </label>
                      <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
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
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleVerifyTwoFactor}>
                    Enable Two-Step Verification
                  </Button>
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