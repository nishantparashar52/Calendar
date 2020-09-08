class Calendar {
    constructor(year) {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
        this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dates = document.getElementById('dates');
        this.table = this.createElem('table');
    }
    createMonths() {
        let leftArrow = this.createArrow('left');
        let rightArrow = this.createArrow('right');
        let monthYearDiv = document.createElement('div');
        monthYearDiv.setAttribute('id', 'month');
        this.setMonthHTML(monthYearDiv);
        let calendar = document.getElementById('calendar');
        calendar.append(leftArrow);
        calendar.append(monthYearDiv);
        calendar.append(rightArrow);
        this.renderDates();
    }
    nextMonth(monthYearDiv) {
        if(this.month === 12) {
            this.year = this.year + 1;
            this.month = 0;
        } else this.month += 1;
        this.commonUtilityForMonth(monthYearDiv);
    }
    prevMonth(monthYearDiv) {
        if(this.month === 0) {
            this.month = 12;
            this.year += -1;
        } else this.month += -1;
        this.commonUtilityForMonth(monthYearDiv);
    }
    commonUtilityForMonth(monthYearDiv) {
        this.setMonthHTML(monthYearDiv);
        this.table.innerHTML = '';
        this.renderDates();
    }
    createArrow(type) {
        let arrow = document.createElement('div');
        arrow.classList.add(`${type }`);
        arrow.setAttribute('id', type);
        return arrow;
    }
    setMonthHTML(elem) {
        return elem.innerHTML = `${this.monthName[this.month]}, ${this.year}`;
    }
    getFirstAndTotalDays(firstDay) {
        return firstDay ? new Date(this.year, this.month, 1).getDay() : new Date(this.year, this.month, 0).getDate();
    }
    createElem(elemName, textNode = '') {
        let elem = document.createElement(elemName);
        let node;
        if(textNode) node = document.createTextNode(node);
        elem.append(textNode);
        return elem;
    }
    renderDates() {
        let date = 1;
        let daysIndex = 0;
        let firstDay = this.getFirstAndTotalDays(true);
        let numberOfDaysinMonth = this.getFirstAndTotalDays();
        let trow = this.createElem('thead');
        let tbody = this.createElem('tbody');
        for(let i = 0, len = this.days.length; i < len; i++) {
            trow.append(this.createElem('th', this.days[i]));
        }
        let tr = this.createElem('tr');
        let td;
        while(date <= numberOfDaysinMonth) {
            if(this.days[firstDay] !== this.days[daysIndex + 1] && date === 1) {
                td = this.createElem('td');
                tr.append(td);
            }
            else {
                td = this.createElem('td', date);
                tr.append(td);
                if(daysIndex % 6 === 0 && daysIndex !== 0) {
                    tbody.append(tr);
                    tr = this.createElem('tr');
                }
                date++;
            }
            daysIndex = daysIndex % 6 === 0 && daysIndex !== 0 ? 0 : ++daysIndex;
        }
        this.table.append(trow);
        tbody.append(tr);
        this.table.append(tbody);
        this.dates.append(this.table);
    }
}

var C1 = new Calendar();
C1.createMonths();
let month = document.getElementById('month');
let left = document.getElementById('left');
left.addEventListener('click', C1.prevMonth.bind(C1, month))
let right = document.getElementById('right');
right.addEventListener('click', C1.nextMonth.bind(C1, month))
