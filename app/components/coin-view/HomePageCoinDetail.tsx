import { Coins } from '@prisma/client'
import React from 'react'
import CoinImage from './CoinImage';

export default function HomePageCoinDetail(props: { coin: Coins }) {
    const coin = props.coin;

    return (
        <div className='flex mt-4'>
            <div className='flex-none w-32'>
                <CoinImage images={coin.Images} />
            </div>
            <div className='grow'>
                <p className='text-xl'>{coin.commonName} ({coin.prettyFaceValue})</p>
                {
                    coin.seriesOrThemeName &&
                    <p className='text-xs'>
                        <span className='font-bold'>Series:</span> <span className='uppercase'>{coin.seriesOrThemeName}</span>
                    </p>
                }
                <p className='mt-2'><span className='font-bold'>Obversee:</span> {coin.obverse}</p>
                <p><span className='font-bold'>Reverse:</span> {coin.reverse}</p>
                <p className='text-xs pt-2'>Ref#: {coin.id}</p>
            </div>
        </div>
    )
}
