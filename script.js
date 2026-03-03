const form = document.getElementById('calc-form');
const resultSection = document.getElementById('result');

const bmiValue = document.getElementById('bmi-value');
const bmiLabel = document.getElementById('bmi-label');
const bmrValue = document.getElementById('bmr-value');
const tdeeValue = document.getElementById('tdee-value');
const cutValue = document.getElementById('cut-value');
const macroBody = document.getElementById('macro-body');

const bmiText = (bmi) => {
  if (bmi < 18.5) return '偏瘦（可先小幅增肌）';
  if (bmi < 24) return '正常（适合稳健减脂）';
  if (bmi < 28) return '超重（建议减脂）';
  return '肥胖（建议在专业指导下减脂）';
};

const round = (n) => Math.round(n);

function getBmr({ gender, weight, height, age }) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

function buildMacroRow(type, scene, calories, proteinG, fatG) {
  const proteinCals = proteinG * 4;
  const fatCals = fatG * 9;
  const carbG = Math.max(0, (calories - proteinCals - fatCals) / 4);

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${type}</td>
    <td>${scene}</td>
    <td>${round(calories)} kcal</td>
    <td>${round(proteinG)} g</td>
    <td>${round(fatG)} g</td>
    <td>${round(carbG)} g</td>
  `;
  return row;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const gender = document.getElementById('gender').value;
  const age = Number(document.getElementById('age').value);
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);
  const activity = Number(document.getElementById('activity').value);
  const deficit = Number(document.getElementById('deficit').value);

  const bmi = weight / ((height / 100) ** 2);
  const bmr = getBmr({ gender, weight, height, age });
  const tdee = bmr * activity;
  const cutCalories = tdee * (1 - deficit);

  bmiValue.textContent = bmi.toFixed(1);
  bmiLabel.textContent = bmiText(bmi);
  bmrValue.textContent = `${round(bmr)} kcal / 天`;
  tdeeValue.textContent = `${round(tdee)} kcal / 天`;
  cutValue.textContent = `${round(cutCalories)} kcal / 天`;

  const protein = weight * 2;

  const highCalories = cutCalories * 1.1;
  const mediumCalories = cutCalories;
  const lowCalories = cutCalories * 0.85;

  macroBody.innerHTML = '';
  macroBody.appendChild(buildMacroRow('高碳日', '大肌群力量训练', highCalories, protein, weight * 0.6));
  macroBody.appendChild(buildMacroRow('中碳日', '常规训练/有氧', mediumCalories, protein, weight * 0.75));
  macroBody.appendChild(buildMacroRow('低碳日', '休息/低强度活动', lowCalories, protein, weight * 0.9));

  resultSection.hidden = false;
});
