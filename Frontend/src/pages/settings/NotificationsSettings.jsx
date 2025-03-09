"use client";
import { useState, useEffect } from "react";
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Smartphone, AlertTriangle, Clock, DollarSign, Shield, Users } from "lucide-react";
import { toast } from "sonner"; // Fixed import for toast notifications

// Mock API functions (replace with your actual API calls)
const fetchNotificationSettings = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: {
          accountAlerts: true,
          securityAlerts: true,
          promotionalEmails: false,
          weeklyDigest: true,
          transactionReceipts: true,
        },
        push: {
          accountAlerts: true,
          securityAlerts: true,
          paymentReminders: true,
          newFeatures: false,
          balanceUpdates: true,
        },
        sms: {
          accountAlerts: false,
          securityAlerts: true,
          paymentReminders: false,
          transactionAlerts: true,
        }
      });
    }, 600);
  });
};

const updateNotificationSettings = async (settings) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Settings saved:", settings);
      resolve({ success: true });
    }, 800);
  });
};

const NotificationsSettings = () => {
  const [settings, setSettings] = useState({
    email: {},
    push: {},
    sms: {},
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(null);

  // Load notification settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchNotificationSettings();
        setSettings(data);
        setOriginalSettings(JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load notification settings:", error);
        toast.error("Failed to load notification settings. Please try again.");
        setLoading(false);
      }
    };
    
    loadSettings();
  }, []);

  // Check for unsaved changes
  useEffect(() => {
    if (originalSettings) {
      setHasChanges(JSON.stringify(settings) !== originalSettings);
    }
  }, [settings, originalSettings]);

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateNotificationSettings(settings);
      setOriginalSettings(JSON.stringify(settings));
      toast.success("Settings saved", {
        description: "Your notification preferences have been updated successfully."
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Save failed", {
        description: "There was a problem saving your settings. Please try again."
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalSettings) {
      setSettings(JSON.parse(originalSettings));
      toast.info("Changes discarded", {
        description: "Your notification settings have been reset to their previous state."
      });
    }
  };

  const NotificationItem = ({ icon, title, description, checked, onChange, disabled = false }) => (
    <div className="flex items-start justify-between py-4">
      <div className="flex gap-3">
        <div className="mt-0.5">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled || saving} />
    </div>
  );

  if (loading) {
    return (
      <div className="flex">
        <SettingsSidebar />
        <div className="flex-1 p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading notification settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SettingsSidebar />
      <div className="flex-1 p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage how and when you receive notifications from the platform.
          </p>
        </div>

        <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="push" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Push</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>SMS</span>
              </TabsTrigger>
            </TabsList>
            
            {hasChanges && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50">Unsaved changes</Badge>
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "email" && "Email Notifications"}
                {activeTab === "push" && "Push Notifications"}
                {activeTab === "sms" && "SMS Notifications"}
              </CardTitle>
              <CardDescription>
                {activeTab === "email" && "Configure which emails you'd like to receive"}
                {activeTab === "push" && "Control what appears on your devices"}
                {activeTab === "sms" && "Manage text message alerts (standard rates may apply)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="email" className="mt-0">
                <div className="space-y-1">
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                    title="Account Alerts"
                    description="Important notifications about your account status and activity"
                    checked={settings.email.accountAlerts}
                    onChange={() => handleToggle("email", "accountAlerts")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Shield className="h-5 w-5 text-blue-500" />}
                    title="Security Alerts"
                    description="Notifications about sign-ins, password changes, and suspicious activity"
                    checked={settings.email.securityAlerts}
                    onChange={() => handleToggle("email", "securityAlerts")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Mail className="h-5 w-5 text-green-500" />}
                    title="Promotional Emails"
                    description="Updates about new features, offers, and other marketing communications"
                    checked={settings.email.promotionalEmails}
                    onChange={() => handleToggle("email", "promotionalEmails")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Clock className="h-5 w-5 text-purple-500" />}
                    title="Weekly Digest"
                    description="A summary of your account activity sent once a week"
                    checked={settings.email.weeklyDigest}
                    onChange={() => handleToggle("email", "weeklyDigest")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
                    title="Transaction Receipts"
                    description="Receive email receipts for every transaction"
                    checked={settings.email.transactionReceipts}
                    onChange={() => handleToggle("email", "transactionReceipts")}
                  />
                </div>
              </TabsContent>

              <TabsContent value="push" className="mt-0">
                <div className="space-y-1">
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                    title="Account Alerts"
                    description="Important notifications about your account status and activity"
                    checked={settings.push.accountAlerts}
                    onChange={() => handleToggle("push", "accountAlerts")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Shield className="h-5 w-5 text-blue-500" />}
                    title="Security Alerts"
                    description="Notifications about sign-ins, password changes, and suspicious activity"
                    checked={settings.push.securityAlerts}
                    onChange={() => handleToggle("push", "securityAlerts")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Clock className="h-5 w-5 text-amber-500" />}
                    title="Payment Reminders"
                    description="Get reminded when payments are due or upcoming"
                    checked={settings.push.paymentReminders}
                    onChange={() => handleToggle("push", "paymentReminders")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Users className="h-5 w-5 text-indigo-500" />}
                    title="New Features"
                    description="Stay updated when we launch new features"
                    checked={settings.push.newFeatures}
                    onChange={() => handleToggle("push", "newFeatures")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
                    title="Balance Updates"
                    description="Get notified when your account balance changes"
                    checked={settings.push.balanceUpdates}
                    onChange={() => handleToggle("push", "balanceUpdates")}
                  />
                </div>
              </TabsContent>

              <TabsContent value="sms" className="mt-0">
                <div className="space-y-1">
                  <NotificationItem
                    icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                    title="Account Alerts"
                    description="Important notifications about your account status and activity"
                    checked={settings.sms.accountAlerts}
                    onChange={() => handleToggle("sms", "accountAlerts")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Shield className="h-5 w-5 text-blue-500" />}
                    title="Security Alerts"
                    description="Notifications about sign-ins, password changes, and suspicious activity"
                    checked={settings.sms.securityAlerts}
                    onChange={() => handleToggle("sms", "securityAlerts")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<Clock className="h-5 w-5 text-amber-500" />}
                    title="Payment Reminders"
                    description="Get reminded when payments are due or upcoming"
                    checked={settings.sms.paymentReminders}
                    onChange={() => handleToggle("sms", "paymentReminders")}
                  />
                  <Separator />
                  <NotificationItem
                    icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
                    title="Transaction Alerts"
                    description="Receive SMS notifications for transactions above a certain amount"
                    checked={settings.sms.transactionAlerts}
                    onChange={() => handleToggle("sms", "transactionAlerts")}
                  />
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={handleReset} 
            disabled={!hasChanges || saving}
          >
            Discard Changes
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || saving}
            className="min-w-[120px]"
          >
            {saving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Saving...
              </>
            ) : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;