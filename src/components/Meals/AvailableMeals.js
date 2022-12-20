import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem'
import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { getDatabase, ref, onValue, off } from 'firebase/database'

const override = {
    textAlign: "center",
    color: "#ad5502",
    margin: "2rem"
};

const AvailableMeals = () => {
    const [availableMeals, setAvailableMeals] = useState([])
    const [isALoading, setIsALoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {

        const db = getDatabase();
        const dbRef = ref(db, 'meals');
        onValue(dbRef, (snapshot) => {
            setError(null)
            setIsALoading(true)
            const meals = []
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const mealId = childSnapshot.key;
                    const mealData = childSnapshot.val();
                    meals.push({ id: mealId, ...mealData })
                });
            }
            setIsALoading(false)
            setAvailableMeals(meals)
        }, (error) => {
            setError(error.message)
        });
        return () => { off(dbRef) }
    }, [])

    const mealsList = availableMeals.map((meal) => {
        return <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    })

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
                {availableMeals.length === 0 && !isALoading && !error && <p className={classes.no_meal_found}>No Meals Found.</p>}
                {!isALoading && error && <p className={classes.no_meal_found}>{error}</p>}
                {<SyncLoader cssOverride={override} loading={isALoading} />}
            </ul>
        </Card>
    </section>
}
export default AvailableMeals