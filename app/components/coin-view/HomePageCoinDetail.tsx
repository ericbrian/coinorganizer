import { Coins } from '@prisma/client'
import React from 'react'

export default function HomePageCoinDetail(props: { coin: Coins }) {
    const coin = props.coin;
    return (
        <div className='grid grid-cols-2 gap-4'>
            <div>Image</div>
            <div>
                <p>Obversee: {coin.obverse}</p>
                <p>Reverse: {coin.reverse}</p>
                <p>Ref#: {coin.id}</p>
            </div>
        </div>
    )
}
