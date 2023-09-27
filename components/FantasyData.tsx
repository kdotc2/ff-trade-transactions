interface FantastyData {
  transactions: Transactions[]
  teams: Teams[]
  members: Members[]
}

interface Transactions {
  id: string
  items?: Item[]
  memberId: string
  proposedDate: number
  type: string
}

type Item = {
  fromTeamId: number
  playerId: number
  toTeamId: number
  type: string
}

interface Teams {
  id: number
  name: string
  primaryOwner: string
  nickname: string
}

interface Members {
  firstName: string
  id: string
  lastName: string
}

async function getData(): Promise<FantastyData> {
  const res = await fetch(
    'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/233460783?&view=mTeam&view=mTransactions2',
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

  let res: any[] = []

  datas.members.map((obj) => {
    res.push({
      ...obj,
      ...datas.teams.find((item) => item.primaryOwner === obj.id),
    })
  })

  return (
    <div className="mx-auto my-10 flex">
      <div className="grid grid-cols-3 gap-4">
        {res.map((data) => (
          <div key={data.id} className="rounded-lg border p-4">
            <div>
              <div className="flex items-center">
                <img
                  src={data.logo}
                  alt="team logo"
                  width={64}
                  height={64}
                  className="rounded-lg "
                />
                <div className="flex flex-col pl-4">
                  <div className="font-bold">{data.name}</div>
                  <div>
                    {data.firstName} {data.lastName}
                  </div>
                  <div>Team Id #{data.id}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {datas.transactions.map((data) => (
          <div key={data.id}>
            <div className="flex flex-col rounded-lg border p-4">
              {data.type}
              {data.items &&
                data.items.map((data) => (
                  <div key={data.playerId} className="flex justify-between">
                    {data.fromTeamId}
                    <div className="mx-10">{data.playerId}</div>
                    {data.toTeamId}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
