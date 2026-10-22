
<script lang="ts">
  import { getTitle } from '#lib/getRating.ts'

  type Participiant = {
    name: string,
    points: number,
    prestige: number,
    group: string | null,
  }

  const student =
    {
      name: 'name',
      points: 1000,
      prestige: 0,
      group: 'class',
    } 

  let data: Participiant[] = $state([
    student
  ])

  //Сортировка
  let participiants = $derived.by(() => {
    const dataWithIndexes = data.map((d, i) => ({
      ...d,
      indexBeforeSort: i
    }))
    const sorted = dataWithIndexes.toSorted((a, b) => b.points - a.points)
    const grouped = Object.groupBy(sorted, ({ group }) => group ? group : '_excluded')
    delete grouped._excluded
    return sorted.map((p, i) => ({
      ...p,
      title: getTitle(p.points),
      rank: i + 1,
      rankInGroup: (
        p.group
                                    // сравнение адресов объектов
          ? grouped[p.group]!.findIndex((v) => p === v) + 1
          : null
      ),
    }))
  })
</script>

<h1>Список участников</h1>

<table id="participantsTable">
 <thead>
  <tr>
    <th>Общий №</th>
    <th>№ в группе</th>
    <th>Имя</th>
    <th>Рейтинг</th>
    <th>Звание</th>
    <th>Группа</th>
    <th>Действия</th>
  </tr>
 </thead>
 <tbody>
   {#each participiants as p, i}
     <tr>
       <td><span>{p.rank}</span></td>
       <td><span>{p.rankInGroup}</span></td>
       <td>
         <input bind:value={data[p.indexBeforeSort].name}>
         <span>{'⭐️'.repeat(p.prestige)}</span>
       </td>
       <td>
         {p.points}

         <button class='button add' onclick={()=>{
           const item = data[p.indexBeforeSort]
           item.points += 50
         }}>+50</button>

         <button class='button minus' onclick={()=>{
          const item = data[p.indexBeforeSort]
          item.points -= 50
          if (item.points < 0) item.points = 0
        }}>-50</button>
       </td>
       <td>{p.title}</td>
       <td>{p.group}</td>
       <td>
         <button class='button delete' onclick={() => {
           data.splice(p.indexBeforeSort, 1)
          }}>Удалить</button>
       </td>
     </tr>

   {/each}
 </tbody>
</table>
<button class='button' onclick={() => {
  data.push({...student})
}}>Добавить участника</button>
