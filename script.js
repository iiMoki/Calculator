class Calculator{
    constructor(prevElement, curElement) {
        this.prevElement = prevElement
        this.curElement = curElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+ number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const cur = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(cur)) return
        switch(this.operation){
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case 'x':
                computation = prev * cur
                break
            case '/':
                if(cur == 0){
                    alert("Can't divide by zero")
                    return;
                }
                computation = prev / cur
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }
    getDisplayNumber(number){
        const stringNumb = number.toString()
        const intDigits = parseFloat(stringNumb.split('.')[0])
        const decimalDigits = stringNumb.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)){
            intDisplay = ''
        } else{
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`
        } else {
            return intDisplay
        }
    }
    updateDisplay(){
        this.curElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.prevElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevElement.innerText =''
        }
    }
}


const numBtn= document.querySelectorAll('[data-number')
const opBtn= document.querySelectorAll('[data-operation')
const eqBtn=document.querySelector('[data-equals]')
const delBtn=document.querySelector('[data-delete]')
const clrBtn=document.querySelector('[data-all-clear]')
const prevElement=document.querySelector('[data-previous-operand]')
const curElement=document.querySelector('[data-current-operand]')

const calc = new Calculator(prevElement,curElement)
numBtn.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})
opBtn.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

eqBtn.addEventListener('click',button=>{
    calc.compute()
    calc.updateDisplay()
})
clrBtn.addEventListener('click',button=>{
    calc.clear()
    calc.updateDisplay()
})
delBtn.addEventListener('click',button=>{
    calc.delete()
    calc.updateDisplay()
})