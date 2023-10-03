/*
This class will have all `static` methods. 
Meaning we do not have to instantiate the class. 
There is no need to because we never need more than one instance. 
So we can call the methods directly from the class (Storage.methodName()).
*/

class Storage {
  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static setCalorieLimit(calorie_limit) {
    localStorage.setItem('calorie_limit', calorie_limit);
  }

  static getCalorieLimit(default_limit = 2000) {
    let calorie_limit;
    if (localStorage.getItem('calorie_limit') === null) {
      calorie_limit = default_limit;
    } else {
      calorie_limit = +localStorage.getItem('calorie_limit');
    }
    return calorie_limit;
  }

  static getTotalCalories(default_calories = 0) {
    let total_calories;
    if (localStorage.getItem('total_calories') === null) {
      total_calories = default_calories;
    } else {
      total_calories = +localStorage.getItem('total_calories');
    }
    return total_calories;
  }

  static updateCalories(calories) {
    localStorage.setItem('total_calories', calories);
  }

  static clearAll() {
    //localStorage.clear() // Use this to clear everything including calorie limit
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');
    localStorage.removeItem('totalCalories');
  }
}

export default Storage;
