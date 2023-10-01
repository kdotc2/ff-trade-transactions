import footballPlayerData from 'playerData.json'

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
  executionType: string
  status: string
}

type Item = {
  fromTeamId: number
  playerId: number
  toTeamId: number
  type: string
  toLineupSlotId: number
}

interface Teams {
  id: number
  name: string
  primaryOwner: string
  nickname: string
  logo: string
}

interface Members {
  firstName: string
  id: string
  lastName: string
}

interface PlayerData {
  items: Items[]
}

interface Items {
  id: string
  uid: string
  fullName: string
  active: boolean
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
  const fantasyTeamData: any[] = []

  // combine "members" & "teams" by matching id and primaryOwner strings into object
  datas.members.map((obj) => {
    fantasyTeamData.push({
      ...obj,
      ...datas.teams.find((item) => item.primaryOwner === obj.id),
    })
  })

  // const teamMap = new Map(fantasyTeamData.map((team) => [team.id, team.name]))
  const teamIdToName: any[] = []
  fantasyTeamData.forEach((item) => {
    teamIdToName[item.id] = item.name
  })

  // grab json data from local file

  const playerData = footballPlayerData as PlayerData
  const playerInfo = playerData.items.filter(({ active }) => active === true)
  const playerIdToName: number[] = []
  playerInfo.forEach((item: any) => {
    playerIdToName[item.id] = item.fullName
  })

  // console.log(playerInfo[2])

  const teamInfo = fantasyTeamData.map((data) => (
    <div key={data.id} className="rounded-lg border p-4">
      <div>
        <div className="flex items-center">
          <img src={data.logo} alt="team logo" width={64} height={64} className="rounded-lg" />
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
  ))

  const tradeProposalData = datas.transactions.filter(({ type }) => type === 'TRADE_PROPOSAL')

  tradeProposalData.forEach((transaction) => {
    transaction.items?.forEach((item) => {
      item.fromTeamId = teamIdToName[item.fromTeamId]
      item.toTeamId = teamIdToName[item.toTeamId]
      item.playerId = playerIdToName[item.playerId]
    })
  })

  // console.log(tradeProposalData[1]['items'])

  const formatDate = (proposedDate: number) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23', // military time format
    }
    const date = new Date(proposedDate).toLocaleDateString('en-us', options)

    const formattedDate = date.replaceAll(',', '') // remove commas
    return formattedDate
  }

  const tradeProposal = tradeProposalData.map((data) => (
    <div key={data.id}>
      <div className="flex flex-col rounded-lg border px-4 py-4">
        <div className="flex justify-between bg-gray-200 px-2 font-medium dark:bg-gray-800">
          <div className="tabular-nums">{formatDate(data.proposedDate)}</div>
          <div>{data.status}</div>
        </div>
        {data.items &&
          data.items.map((data) => (
            <div key={data.playerId} className="flex justify-between px-2">
              <div>{data.playerId}</div>
              <div>{data.fromTeamId}</div>
            </div>
          ))}
      </div>
    </div>
  ))

  return (
    <div className="mx-auto my-10">
      <div>
        <p className="p-3 text-xl font-bold">Team Info</p>
        <div className="grid grid-cols-3 gap-4">{teamInfo}</div>
      </div>
      <div className="mt-10">
        <p className="p-3 text-xl font-bold">Trade Proposals</p>
        <div className="space-y-4">{tradeProposal}</div>
      </div>
    </div>
  )
}
