import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    console.log(percentage)
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {/* <img src="/grafico.jpg" alt="Graphic" /> */}
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textSize: '8',
                        textColor: percentage === 100 ? '#DC2626' : '#3B82F6'
                    })}
                    text={`${percentage}% Spent`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-pink-700 transition-colors"
                    onClick={() => dispatch({type: 'reset-app'})}
                >
                    Reset App
                </button>
                 
                <AmountDisplay 
                    label="Budget"
                    amount={state.budget}
                />
                <AmountDisplay 
                    label="Available"
                    amount={remainingBudget}
                />
                <AmountDisplay 
                    label="Spent"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}