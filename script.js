const calculateBtn = document.getElementById('calculateBtn');

function bmiCategory(bmi) {
  if (bmi < 18.5) return '偏瘦';
  if (bmi < 24) return '正常';
  if (bmi < 28) return '超重';
  return '肥胖';
}

function calculate() {
  const heightCm = Number(document.getElementById('height').value);
  const weightKg = Number(document.getElementById('weight').value);
  const age = Number(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const activity = Number(document.getElementById('activity').value);
  const deficit = Number(document.getElementById('deficit').value);

  if (!heightCm || !weightKg || !age || activity <= 0) {
    alert('请完整填写身高、体重、年龄与活动水平。');
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM ** 2);

  const bmr = sex === 'male'
    ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
    : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;

  const tdee = bmr * activity;
  const targetCalories = Math.max(1200, tdee - deficit);

  document.getElementById('bmiResult').textContent = `BMI：${bmi.toFixed(1)}`;
  document.getElementById('bmiCategory').textContent = `体重状态：${bmiCategory(bmi)}`;
  document.getElementById('tdeeResult').textContent = `维持热量（TDEE）：${Math.round(tdee)} kcal/天`;
  document.getElementById('targetResult').textContent = `建议减脂摄入：${Math.round(targetCalories)} kcal/天`;
}

calculateBtn.addEventListener('click', calculate);
