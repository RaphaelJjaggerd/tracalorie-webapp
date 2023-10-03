///////////////////////////////////////
import Storage from './Storage.js';

///////////////////////////////////////
class CalorieTracker {
  constructor() {
    this._calorie_limit = Storage.getCalorieLimit();
    this._total_calories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    // We want these to run when the app loads
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.getElementById('Limit').value = this._calorie_limit;
  }

  // Public Methods / API //
  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  addMeal(meal) {
    this._meals.push(meal); // We push/add the new meal to the meals array
    this._total_calories += meal.calories;
    Storage.updateCalories(this._total_calories);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout); // We push/add the new workout to the workouts array
    this._total_calories -= workout.calories;
    Storage.updateCalories(this._total_calories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._meals.splice(index, 1);
      this._total_calories -= meal.calories;
      Storage.updateCalories(this._total_calories);
      Storage.removeMeal(id);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);
    if (index !== -1) {
      const workout = this._workouts[index];
      this._workouts.splice(index, 1);
      this._total_calories += workout.calories;
      Storage.updateCalories(this._total_calories);
      Storage.removeWorkout(id);
      this._render();
    }
  }

  setLimit(calorie_limit) {
    Storage.setCalorieLimit(calorie_limit);
    this._calorie_limit = calorie_limit;
    this._displayCaloriesLimit();
    this._render();
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  // Private methods / API //
  _displayCaloriesTotal() {
    const total_calories_el = document.getElementById('calories-total');
    total_calories_el.innerHTML = this._total_calories;
  }

  _displayCaloriesLimit() {
    const calorie_limit_el = document.getElementById('calories-limit');
    calorie_limit_el.innerHTML = this._calorie_limit;
  }

  _displayCaloriesConsumed() {
    const calories_consumed_el = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    calories_consumed_el.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const calories_burned_el = document.getElementById('calories-burned');

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    calories_burned_el.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const calories_remaining_el = document.getElementById('calories-remaining');
    const progress_el = document.getElementById('calorie-progress');
    const remaining = this._calorie_limit - this._total_calories;
    calories_remaining_el.innerHTML = remaining;
    if (remaining <= 0) {
      calories_remaining_el.parentElement.classList.remove('bg-light');
      calories_remaining_el.parentElement.classList.add('bg-danger');
      progress_el.classList.add('bg-danger');
      progress_el.classList.remove('bg-success');
    } else {
      calories_remaining_el.parentElement.classList.remove('bg-danger');
      calories_remaining_el.parentElement.classList.add('bg-light');
      progress_el.classList.remove('bg-danger');
      progress_el.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progress_el = document.getElementById('calorie-progress');
    const percentage = (this._total_calories / this._calorie_limit) * 100;
    const width = Math.min(percentage, 100);
    progress_el.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const meals_el = document.getElementById('meal-items');
    const meal_el = document.createElement('div');
    meal_el.classList.add('card', 'my-2');
    meal_el.setAttribute('data-id', meal.id);
    meal_el.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
      </div>
      </div>
    `;
    meals_el.appendChild(meal_el);
  }

  _displayNewWorkout(workout) {
    const workouts_el = document.getElementById('workout-items');
    const workout_el = document.createElement('div');
    workout_el.classList.add('card', 'my-2');
    workout_el.setAttribute('data-id', workout.id);
    workout_el.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    workouts_el.appendChild(workout_el);
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

export default CalorieTracker;
