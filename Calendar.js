class Calendar {
    constructor(year) {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
        this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dates = document.getElementById('dates');
        this.table = this.createElem('table');
        this.tbody = this.createElem('tbody');
        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.trow = this.tableHeader();
        this.createMonths();
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
    nextMonth() {
        if(this.month === 12) {
            this.year = this.year + 1;
            this.month = 0;
        } else this.month += 1;

        this.commonUtilityForMonth();
    }
    prevMonth() {
        if(this.month === 0) {
            this.month = 12;
            this.year += -1;
        } else this.month += -1;
        
        this.commonUtilityForMonth();
    }
    commonUtilityForMonth() {
        this.tbody.innerHTML = '';
        const month = document.getElementById('month');
        this.setMonthHTML(month);
        this.renderDates();
    }
    createArrow(type) {
        let arrow = this.createElem('div');
        arrow.classList.add(`${type }`);
        arrow.setAttribute('id', type);
        arrow.addEventListener('click', type === 'left' ? this.prevMonth : this.nextMonth);
        return arrow;
    }
    setMonthHTML(elem) {
        elem.innerHTML = '';
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
    tableHeader() {
        let trow = this.createElem('thead');
        for(let i = 0, len = this.days.length; i < len; i++) {
            trow.append(this.createElem('th', this.days[i]));
        }
        return trow;
    }
    renderDates() {
        let date = 1;
        let daysIndex = 0;
        let firstDay = this.getFirstAndTotalDays(true);
        let numberOfDaysinMonth = this.getFirstAndTotalDays();
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
                    this.tbody.append(tr);
                    tr = this.createElem('tr');
                }
                date++;
            }
            daysIndex = daysIndex % 6 === 0 && daysIndex !== 0 ? 0 : ++daysIndex;
        }
        this.table.append(this.trow);
        this.tbody.append(tr);
        this.table.append(this.tbody);
        this.dates.append(this.table);
    }
}

var C1 = new Calendar();
