export default smsPatterns = [
  {
    smsPattern:
      /(?<bankName>\d{3})[^.]+ for Rs (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}).*?; (?<recipientName>[\w\s]+) (credited|withdrew)\.?( UPI:(?<upiTransactionId>\d+))?\.?( Avb Bal: INR(?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))?)?/i,
    type: 'debited',
  },
  {
    smsPattern:
      /ICICI Bank Acc XX(?<accountNumber>\d{3}) debited with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})\..*?Avb Bal: INR(?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))?\./i,
    type: 'Atm Withdrawal',
  },

  {
    /*  const smsPattern7 =
    /ICICI Bank Acc XX(?<accountNumber>\d{3}) debited with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})\..*?Info:(?<info>[^\.]+)\.*?Avl Bal is INR (?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))\./i;

  const match = smsPattern7.exec(sms);
  if (match) {
    const bankName = match[1];
    const amount = match[2];

    const upiTransactionId = match[6];
    const availableBalance = match[7];

    console.log(
      `${bankName} ${amount}  ${upiTransactionId} ${availableBalance} `,
    ); 
  } */
  },
  {
    /* 
    const smsPattern7 =
    /We have credited your ICICI Bank Account XX(?<accountNumber>\d{3}) with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}).*?Info:(?<info>[\w\s-]+)\. The Available Balance is INR (?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))\./i;

  const match = smsPattern7.exec(sms);
  if (match) {
    const {accountNumber, amount, info, availableBalance} = match.groups;

    console.log(`${accountNumber} ${amount}  ${info} ${availableBalance} `);
  }
    */
  },
  {
    /* 
    const smsPattern7 =
    /Acct XX(?<accountNumber>\d{3}) is credited with Rs (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}) from (?<senderName>[\w\s]+)\. UPI:(?<upiTransactionId>\d+)-(?<upiAppName>[\w\s]+)\./i;

  const match = smsPattern7.exec(sms);
  if (match) {
    const {
      accountNumber,
      amount,
      senderName,
      upiTransactionId,
    } = match.groups;

    console.log(
      `${accountNumber} ${amount} : ${senderName} ${upiTransactionId}`,
    );
  }
    
    */
  },

  {
    /* 
 const smsPattern7 =
    /(ICICI Bank Account|Acct) XX(?<accountNumber>\d{3}) (is credited with Rs|debited with INR) (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})(( by (?<senderName>[\w\s]+)\.)|( from (?<senderName2>[\w\s]+)\.))?/;
  const match = smsPattern7.exec(sms);
  if (match) {
    const {accountNumber, amount, senderName, senderName2,} =
      match.groups;
    const sender =
      (senderName ? senderName : '') + (senderName2 ? senderName2 : '');
    console.log(`${accountNumber} ${amount} : ${sender} `);
  }

    */
  },
  {
    /*
const smsPattern7 =
    /We have credited your ICICI Bank Account XX(?<accountNumber>\d{3}) with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})\. Info:(?<transactionType>[\w-]+)-(?<transactionId>[\w]+)-(?<senderName>[\w\s]+)\. The Available Balance is INR (?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))\./i;

  const match = smsPattern7.exec(sms);
  if (match) {
    console.log('ma=', match);
    const {accountNumber, amount, senderName, transactionType, senderName2} =
      match.groups;
    const sender =
      (senderName ? senderName : '') + (senderName2 ? senderName2 : '');
    console.log(`${accountNumber} ${amount} : ${sender} ${transactionType}`);
  }

    */
  },
];

const debitPattern =
  /(?<accountNumber>\d{3})[^.]+ for Rs (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}).*?; (?<senderName>[\w\s]+) (credited|withdrew)\.?( UPI:(?<upiTransactionId>\d+))?\.?( Avb Bal: INR(?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))?)?/i;
const atmWithDrawal =
  /ICICI Bank Acc XX(?<accountNumber>\d{3}) debited with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})\. ATM\*(?<atmId>[A-Z]+[\d\w]+)\*\.Avb Bal: INR(?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))?\./i;
const debitPatternLoan =
  /ICICI Bank Acc XX(?<accountNumber>\d{3}) debited with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})\..*?Info:(?<info>[^\.]+)\.*?Avl Bal is INR (?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))\./i;

const creditPattern =
  /(ICICI Bank Account|Acct) XX(?<accountNumber>\d{3}) (is credited with Rs|debited with INR) (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})(( by (?<senderName>[\w\s]+)\.)|( from (?<senderName2>[\w\s]+)\.))?/;
/*const upiCreditPattern =
  /Acct XX(?<accountNumber>\d{3}) is credited with Rs (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}) from (?<senderName>[\w\s]+)\. UPI:(?<upiTransactionId>\d+)-(?<upiAppName>[\w\s]+)\./;
*/ const salaryCredit =
  /We have credited your ICICI Bank Account XX(?<accountNumber>\d{3}) with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}).*?NEFT-(?<neftRefNumber>\w+)-(?<neftSenderName>[\w\s]+)\. The Available Balance is INR (?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))\./;
const debitPattern2 =
  /ICICI Bank Acc XX(?<accountNumber>\d{3}) debited with INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) on (?<date>\d{2}-[A-Za-z]{3}-\d{2})\. NFS\*(?<senderName>\d+)\*\.Avb Bal: INR(?<availableBalance>\d+(,\d{3})*(\.\d{1,2}))?/i;

const cardPattern =
  /INR (?<amount>\d+(,\d{3})*(\.\d{1,2})?) spent on ICICI Bank Card XX(?<accountNumber>\d{4}) on (?<date>\d{2}-[A-Za-z]{3}-\d{2}) at (?<senderName>[\w\s\.]+)\. Avl Lmt: INR (?<availableBalance>\d+(,\d{3})*(\.\d{1,2})?)\./i;

const paytmPattern =
  /You have paid Rs\.(?<amount>\d+\.\d{2}) via a\/c (?<accountNumber>\d{2}XX\d{4}) to (?<senderName>[\w\s]+) on (?<date>\d{2}-\d{2}-\d{4})\. Ref:(?<transactionId>\d+)\. Queries\?/i;

const paytmPatternUpi =
  /^\Rs\.(?<amount>\d+\.\d{2})\s+sent\s+to\s+(?<senderName>\S+)\s+from\s+PPBL\s+a\/c\s+(?<accountNumber>\d{2}XX\d{4})\.\s+UPI\s+Ref:(?<upiRef>\d+)\.\s+Balance:/;

const cardStatement =
  /statement for ICICI Bank Credit Card XX(?<accountNumber>\d{4}).*Total amount of Rs (?<amount>\d+(,\d{3})*(\.\d{1,2})?)/i;

export const patterns = [
  creditPattern,
  debitPattern,
  salaryCredit,
  atmWithDrawal,
  debitPattern2,
  debitPatternLoan,
  cardPattern,
  paytmPattern,
  paytmPatternUpi,
  cardStatement,
];
