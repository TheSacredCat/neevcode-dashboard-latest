import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PiggyBank,
  CalendarClock,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Expenses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [isRecurring, setIsRecurring] = useState("");
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState("");
  const [currentBalance, setCurrentBalance] = useState(85000);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Salary Deposit",
      amount: 150000,
      type: "income",
      category: "Salary",
      date: "2024-03-15",
      isRecurring: true,
      frequency: "Monthly"
    },
    {
      id: 2,
      description: "Office Rent",
      amount: 25000,
      type: "expense",
      category: "Housing",
      date: "2024-03-01",
      isRecurring: true,
      frequency: "Monthly"
    },
    {
      id: 3,
      description: "Office Supplies",
      amount: 8000,
      type: "expense",
      category: "Office",
      date: "2024-03-10",
      isRecurring: false
    },
    {
      id: 4,
      description: "Internet & Utilities",
      amount: 1200,
      type: "expense",
      category: "Utilities",
      date: "2024-03-05",
      isRecurring: true,
      frequency: "Monthly"
    }
  ]);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = currentBalance - totalExpenses;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount: Number(amount),
      type,
      category,
      date: date || new Date().toISOString().split('T')[0],
      isRecurring: isRecurring === "yes",
      frequency: isRecurring === "yes" ? frequency : undefined
    };

    setTransactions([...transactions, newTransaction]);
    
    if (type === "expense") {
      setCurrentBalance(prev => prev - Number(amount));
    } else {
      setCurrentBalance(prev => prev + Number(amount));
    }

    toast.success("Transaction added successfully", {
      description: `Added ${type === "expense" ? "expense" : "income"} of ₹${amount}`,
      duration: 2000,
    });
    setIsDialogOpen(false);
    resetForm();
  };

  const handleUpdateBalance = (e: React.FormEvent) => {
    e.preventDefault();
    const newBalance = Number(amount);
    setCurrentBalance(newBalance);
    setIsBalanceDialogOpen(false);
    setAmount("");
    toast.success("Balance updated successfully", {
      description: `Current balance set to ₹${newBalance.toLocaleString('en-IN')}`,
      duration: 2000,
    });
  };

  const handleDeleteTransaction = (id: number) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      if (transaction.type === "expense") {
        setCurrentBalance(prev => prev + transaction.amount);
      } else {
        setCurrentBalance(prev => prev - transaction.amount);
      }
      setTransactions(transactions.filter(t => t.id !== id));
      toast.success("Transaction deleted", {
        description: `${transaction.description} has been removed`,
        duration: 2000,
      });
    }
  };

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setType("");
    setIsRecurring("");
    setFrequency("");
    setDate("");
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Company Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your company's finances
          </p>
        </div>
        <div className="space-x-4">
          <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                Update Balance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Current Balance</DialogTitle>
                <DialogDescription>
                  Enter the new balance amount.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateBalance} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="balance">New Balance</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="balance"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter new balance"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsBalanceDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                    Update Balance
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Add a new transaction to track your company's income or expenses.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Transaction Type</Label>
                  <Select value={type} onValueChange={setType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary & Payroll</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="software">Software & Tools</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recurring">Recurring Transaction?</Label>
                  <Select value={isRecurring} onValueChange={setIsRecurring}>
                    <SelectTrigger>
                      <SelectValue placeholder="Is this recurring?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {isRecurring === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex justify-end gap-3 mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                    Add Transaction
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(currentBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Available balance in your account
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{formatAmount(totalIncome)}</div>
            <p className="text-xs text-muted-foreground">
              Total income this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{formatAmount(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              Total expenses this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-[#947dc2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#947dc2]">{formatAmount(savings)}</div>
            <p className="text-xs text-muted-foreground">
              Total savings this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(-5).reverse().map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className={`h-4 w-4 text-green-500`} />
                      ) : (
                        <ArrowDownRight className={`h-4 w-4 text-red-500`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurring Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.filter(t => t.isRecurring).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-[#947dc2]/10">
                      <CalendarClock className="h-4 w-4 text-[#947dc2]" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.frequency} - {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Recurring</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className={
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }>
                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#947dc2]/10 text-[#947dc2]">
                        {transaction.frequency}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTransaction(transaction.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
