export default class Event {
  constructor(
    id,
    title,
    description,
    date,
    emoji
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.emoji = emoji;
  }
}