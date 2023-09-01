import {
  coin as CoinType,
  engraver as EngraverType,
  mint as MintType,
  coin_mint as CoinMintType,
  enumCollectionsCollectableType,
} from '@prisma/client';

export const escapedNewLineToLineBreakTag = (str: string) =>
  str.split('\\n').map((item, idx) => (idx === 0 ? item : [<br key={idx} />, item]));

export const getPossibleMints = (coin: CoinType): MintType[] =>
  coin.coin_mint?.map((coinMint: CoinMintType) => coinMint.mint) ?? [];
