
"use client"

import { useState, useMemo, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, Package, ShoppingCart, ArrowDown, ArrowUp, PlusCircle } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const salesData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

type Transaction = {
    id: string;
    description: string;
    type: 'Sale' | 'Expense';
    amount: number;
    status: 'Fulfilled' | 'Paid' | 'Pending';
    date: string;
};

const initialTransactions: Transaction[] = [
    { id: '#1005', description: 'Fleece Jacket Sale', type: 'Sale', amount: 1500, status: 'Fulfilled', date: '2023-07-27' },
    { id: '#1004', description: 'Pot Set Sale', type: 'Sale', amount: 2500, status: 'Fulfilled', date: '2023-07-26' },
    { id: '#E002', description: 'Fuel for Delivery', type: 'Expense', amount: -500, status: 'Paid', date: '2023-07-26' },
    { id: '#1003', description: 'Rice Bag Sale', type: 'Sale', amount: 3200, status: 'Fulfilled', date: '2023-07-25' },
    { id: '#E001', description: 'Supplier Payment', type: 'Expense', amount: -1200, status: 'Paid', date: '2023-07-24' },
];


export default function AccountingPage() {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [open, setOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        type: 'Sale' as 'Sale' | 'Expense',
        amount: ''
    });

    const { totalRevenue, totalCosts, grossProfit, netProfitMargin } = useMemo(() => {
        const revenue = transactions
            .filter(t => t.type === 'Sale')
            .reduce((acc, t) => acc + t.amount, 0);
        
        const costs = transactions
            .filter(t => t.type === 'Expense')
            .reduce((acc, t) => acc + t.amount, 0) * -1; // amount is negative

        const profit = revenue - costs;
        const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

        return {
            totalRevenue: revenue,
            totalCosts: costs,
            grossProfit: profit,
            netProfitMargin: margin
        }
    }, [transactions]);
    
    const chartData = useMemo(() => {
        const monthlySales = [...salesData].map(m => ({ ...m })); // Deep copy
        transactions.forEach(t => {
            if (t.type === 'Sale') {
                const date = new Date(t.date);
                const monthIndex = date.getMonth();
                monthlySales[monthIndex].total += t.amount;
            }
        });
        return monthlySales;
    }, [transactions]);


    const handleSaveTransaction = () => {
        const amountNumber = parseFloat(newTransaction.amount);
        if (newTransaction.description && !isNaN(amountNumber) && amountNumber > 0) {
            const newTx: Transaction = {
                id: newTransaction.type === 'Sale' ? `#${Math.floor(Math.random() * 9000) + 1000}` : `#E${Math.floor(Math.random() * 900) + 100}`,
                description: newTransaction.description,
                type: newTransaction.type,
                amount: newTransaction.type === 'Sale' ? amountNumber : -amountNumber,
                status: newTransaction.type === 'Sale' ? 'Fulfilled' : 'Paid',
                date: new Date().toISOString().split('T')[0],
            };
            setTransactions(prev => [newTx, ...prev]);
            setOpen(false);
            setNewTransaction({ description: '', type: 'Sale', amount: '' });
        }
    };


  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Accounting</h1>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Transaction</DialogTitle>
                  <DialogDescription>
                    Manually add a sale or an expense to your records.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value: 'Sale' | 'Expense') => setNewTransaction(prev => ({...prev, type: value}))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sale">Sale</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input 
                      id="description" 
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction(prev => ({...prev, description: e.target.value}))}
                      className="col-span-3"
                      placeholder="e.g., Office Supplies"
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input 
                        id="amount" 
                        type="number" 
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction(prev => ({...prev, amount: e.target.value}))}
                        placeholder="e.g., 500.00" 
                        className="col-span-3" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveTransaction}>Save Transaction</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">रू{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">रू{totalCosts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-xs text-muted-foreground">+15.3% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">रू{grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-xs text-muted-foreground">+28.2% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Profit Margin</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{netProfitMargin.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">+5.1% from last month</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
             <Card>
                <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                     <CardDescription>A chart showing total sales over the last 12 months.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `रू${value/1000}K`}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                        A list of recent sales and expenses.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.slice(0, 5).map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">{transaction.description}</TableCell>
                                    <TableCell>
                                        <Badge variant={transaction.type === 'Sale' ? 'default' : 'secondary'} className="flex items-center w-fit gap-1">
                                            {transaction.type === 'Sale' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                                            {transaction.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.amount > 0 ? '+' : ''}रू{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter>
                    <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{Math.min(5, transactions.length)}</strong> of <strong>{transactions.length}</strong> transactions
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}
