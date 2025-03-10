"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Users, User, Wallet, Trash2, Edit } from "lucide-react";
import { AccountCard } from "@/components/AccountCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  balance: z.string().min(1, { message: "Balance is required." }),
  accountType: z.enum(["current", "savings", "family"]),
  isDefault: z.boolean().optional(),
  familyMembers: z.array(
    z.object({
      name: z.string().min(2, { message: "Name must be at least 2 characters." }),
      relation: z.string().min(2, { message: "Relation must be specified." }),
    })
  ).optional(),
});

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [familyMembers, setFamilyMembers] = useState([{ name: "", relation: "" }]);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      balance: "",
      accountType: "current",
      isDefault: false,
      familyMembers: [],
    },
  });

  // Watch for account type changes to handle family member fields
  const accountType = form.watch("accountType");

  useEffect(() => {
    if (accountToEdit) {
      form.reset({
        ...accountToEdit,
        balance: accountToEdit.balance.toString(),
        familyMembers: accountToEdit.familyMembers || [],
      });
      
      if (accountToEdit.familyMembers) {
        setFamilyMembers(accountToEdit.familyMembers);
      }
    }
  }, [accountToEdit, form]);

  const closeAndResetForm = () => {
    form.reset({
      firstName: "",
      lastName: "",
      balance: "",
      accountType: "current",
      isDefault: false,
      familyMembers: [],
    });
    setFamilyMembers([{ name: "", relation: "" }]);
    setAccountToEdit(null);
    setOpenDialog(false);
  };

  const onSubmit = (data) => {
    const accountData = {
      ...data,
      id: accountToEdit ? accountToEdit.id : Date.now().toString(),
      balance: parseFloat(data.balance),
    };

    if (data.accountType === "family") {
      accountData.familyMembers = familyMembers.filter(member => member.name && member.relation);
    }

    if (accountToEdit) {
      // Update existing account
      setAccounts(prev => prev.map(acc => 
        acc.id === accountToEdit.id ? accountData : acc
      ));
    } else {
      // Add new account
      setAccounts(prev => [...prev, accountData]);
    }
    
    closeAndResetForm();
  };

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", relation: "" }]);
  };

  const handleRemoveFamilyMember = (index) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  const updateFamilyMember = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

  const handleDeleteAccount = (accountId) => {
    setAccounts(prev => prev.filter(acc => acc.id !== accountId));
  };

  const handleEditAccount = (account) => {
    setAccountToEdit(account);
    setOpenDialog(true);
  };

  const filteredAccounts = activeTab === "all" 
    ? accounts 
    : accounts.filter(account => account.accountType === activeTab);

  const getTotalBalance = () => {
    return accounts.reduce((sum, account) => sum + account.balance, 0).toFixed(2);
  };

  const getAccountTypeIcon = (type) => {
    switch(type) {
      case "family": return <Users className="h-5 w-5" />;
      case "savings": return <Wallet className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center gap-96 mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Accounts</h1>
          <p className="text-muted-foreground">
            Manage your personal and family finances
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-2xl font-bold">${getTotalBalance()}</p>
          </div>
          <Button onClick={() => setOpenDialog(true)} className="flex gap-2">
            <Plus size={18} /> New Account
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <Card key={account.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2 items-center">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {getAccountTypeIcon(account.accountType)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {account.firstName} {account.lastName}
                          </CardTitle>
                          <CardDescription className="capitalize">
                            {account.accountType} Account
                          </CardDescription>
                        </div>
                      </div>
                      {account.isDefault && (
                        <Badge variant="outline" className="bg-primary/5">Default</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
                    </div>
                    
                    {account.accountType === "family" && account.familyMembers && account.familyMembers.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Family Members</p>
                        <div className="space-y-2">
                          {account.familyMembers.map((member, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <p>{member.name}</p>
                              <Badge variant="outline">{member.relation}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <Separator />
                  <CardFooter className="pt-4 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditAccount(account)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <div className="bg-muted/30 p-6 rounded-full mb-4">
                  <Wallet className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No accounts found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "all" 
                    ? "You haven't created any accounts yet." 
                    : `You don't have any ${activeTab} accounts.`}
                </p>
                <Button onClick={() => setOpenDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Create New Account
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{accountToEdit ? "Edit Account" : "Create New Account"}</DialogTitle>
            <DialogDescription>
              {accountToEdit 
                ? "Update your account information below." 
                : "Enter your account details to create a new account."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Balance</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="current">Current</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {accountType === "family" && (
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Family Members</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAddFamilyMember}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Member
                    </Button>
                  </div>
                  
                  {familyMembers.map((member, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3 items-center">
                      <div className="col-span-2">
                        <FormLabel className="text-xs">Name</FormLabel>
                        <Input
                          value={member.name}
                          onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                          placeholder="Member name"
                          size="sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <FormLabel className="text-xs">Relation</FormLabel>
                        <Input
                          value={member.relation}
                          onChange={(e) => updateFamilyMember(index, "relation", e.target.value)}
                          placeholder="e.g. Spouse, Child"
                          size="sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFamilyMember(index)}
                          disabled={familyMembers.length === 1}
                          className="h-9 mt-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div>
                      <FormLabel>Set as Default Account</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        This account will be used for primary transactions
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={closeAndResetForm}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {accountToEdit ? "Save Changes" : "Create Account"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Accounts;