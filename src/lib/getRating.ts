export function getTitle(points: number) {
  if (points <= 100) return 'Новичок I';
  if (points <= 200) return 'Новичок II';
  if (points <= 400) return 'Новичок III';
  if (points <= 600) return 'Новичок IV';
  if (points <= 800) return 'Новичок V';
  if (points <= 1000) return 'Пользователь I';
  if (points <= 1200) return 'Пользователь II';
  if (points <= 1400) return 'Пользователь III';
  if (points <= 1600) return 'Пользователь IV';
  if (points <= 1800) return 'Пользователь V';
  if (points <= 2000) return 'Разработчик I';
  if (points <= 2200) return 'Разработчик II';
  if (points <= 2400) return 'Разработчик III';
  if (points <= 2600) return 'Разработчик IV';
  if (points <= 2800) return 'Разработчик V';
  if (points <= 3000) return 'Эксперт I';
  if (points <= 3200) return 'Эксперт II';
  if (points <= 3400) return 'Эксперт III';
  if (points <= 3600) return 'Эксперт IV';
  if (points <= 3800) return 'Эксперт V';
  if (points <= 4000) return 'Мастер I';
  if (points <= 4300) return 'Мастер II';
  if (points <= 4600) return 'Мастер III';
  if (points <= 4900) return 'Мастер IV';
  if (points <= 5200) return 'Мастер V';
  return 'Легенда IT';
}
