export type AccountType =
	| "assets" // 資産
	| "liabilities" // 負債
	| "equity" // 純資産
	| "income" // 収益
	| "expense" // 費用

// 仕訳
export type JournalEntry = {
	id: string
	createdAt: Date
	eventId: string
	lines: JournalLine[]
}

// 仕訳の一行
export type JournalLine = {
	id: string
	account: Account
	amount: number
}

// 勘定科目
export type Account = {
	id: string
	name: string
	type: AccountType
}
