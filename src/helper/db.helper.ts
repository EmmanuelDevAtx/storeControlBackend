export function transformInsensitiveQuery(query: any) {
  if (query?.email && !JSON.stringify(query.email).includes('$regex')) {
    const escapedEmail = query.email.replace(/[.+]/g, '\\$&');
    query.email = { $regex: new RegExp(escapedEmail, 'i') };
  }
  if (query?.walletAddress && !JSON.stringify(query.walletAddress).includes('$regex')) {
    query.walletAddress = { $regex: new RegExp(query.walletAddress, 'i') };
  }
  if (query?.contractAddress && !JSON.stringify(query.contractAddress).includes('$regex')) {
    query.contractAddress = { $regex: new RegExp(query.contractAddress, 'i') };
  }
  if (query?.minter && !JSON.stringify(query.minter).includes('$regex')) {
    query.minter = { $regex: new RegExp(query.minter, 'i') };
  }
  return query;
}
