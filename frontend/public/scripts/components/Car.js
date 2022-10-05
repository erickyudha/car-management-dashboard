class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map(car => {
      return new this(
        car.id,
        car.name,
        car.size,
        car.rent_per_day,
        car.image_url,
        car.createdAt,
        car.updatedAt
      )
    });
  }

  constructor(
    id,
    name,
    size,
    rentPerDay,
    imageUrl,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.rentPerDay = rentPerDay;
    this.imageUrl = imageUrl;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  render() {
    return `
        <div class="img-container">
          <img src="${this.imageUrl}" alt="car-img" />
        </div>
        <div class="car-card-text">
          <span>${this.name}</span>
          <span class="text-bold">Rp ${this.rentPerDay} / hari</span>
          <div>
            <img src="img/icons/clock.svg" alt="" />
            <span>Updated at ${this.updatedAt.toLocaleString()}</span>
          </div>
        </div>
        <div class="car-card-btn">
          <a class="btn-delete">
            <img src="img/icons/trash.svg" alt="delete-icon" />
            <span>Delete</span>
          </a>
          <a href="/edit?id=${this.id}" class="btn-edit">
            <img src="img/icons/edit.svg" alt="edit-icon" />
            <span>Edit</span>
          </a>
        </div>
        `
  }
}