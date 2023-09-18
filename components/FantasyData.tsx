async function getData() {
  const res = await fetch(
    'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/233460783?&view=mTransactions2',
    {
      headers: {
        Cookie: `espn_s2=${process.env.NEXT_PUBLIC_ESPN_S2}; SWID=${process.env.NEXT_PUBLIC_SWID};`,
      },
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function FantastyData() {
  const datas = await getData()

  return (
    <div>
      <>
        <div>
          {datas.transactions.map((data: { type: string; id: string }) => {
            return <div key={data.id}>{data.type}</div>
          })}
        </div>
      </>
    </div>
  )
}
