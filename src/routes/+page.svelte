
<script lang="ts">
  import { getTitle } from '#lib/getRating.ts'

  type Participiant = {
    id: number,
    name: string,
    points: number,
    prestige: number,
    group: string | null,
  }

  const student =
    {
      id: 0,
      name: 'name',
      points: 1000,
      prestige: 0,
      group: 'class',
    }
  const example2 = {
      id: 1,
      name: 'Амстронг Варувич',
      points: 4852,
      prestige: 3,
      group: '10А',
  }

  let data: Participiant[] = $state([
    student
  ])
  
  //Сортировка
  let participiants = $derived.by(() => {
    const sorted = data.toSorted((a, b) => b.points - a.points)
    const grouped = Object.groupBy(sorted, ({ group }) => group ? group : '_excluded')
    delete grouped._excluded
    return sorted.map((p, i) => ({
      ...p,
      title: getTitle(p.points),
      rank: i + 1,
      rankInGroup: (
        p.group
          ? grouped[p.group]!.findIndex((v) => p.id == v.id) + 1
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
         <span>{p.name} {'⭐️'.repeat(p.prestige)}</span>
       </td>
       <td>{p.points}</td>
       <td>{p.title}</td>
       <td>{p.group}</td>
       <td>
         <button class='button delete' onclick={() => {
           data = data.filter(d => d.id !== p.id);
          }}>Удалить</button>

         <button class='button add' onclick={()=>{
          const item = data.find(d => d.id === p.id);
          if(item){item.points += 50};
         }}>+50</button>
         
         <button class='button minus' onclick={()=>{
          const item = data.find(d => d.id === p.id);
          if(item){
            if(item.points <= 50){item.points=0}
            else{item.points -= 50}
          };
          }}>-50</button>
       </td>
     </tr>

   {/each}
 </tbody>
</table>
<button class='button' onclick={() => {
  data.push(example2)
}}>Добавить участника</button>
