import { Water } from '../db/models/waterModel.js';

export const localDate = () => {
  const date = new Date();
  return date.toLocaleDateString();
};

export const localTime = () => {
  const time = new Date();
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const dateNormalizer = (dateValue) => {
  if (typeof dateValue !== 'string') {
    throw new TypeError('dateValue must be a string');
  }
  return dateValue.split(/[\\/.\-]/).join('.');
};

export const addWater = async (waterData, user) => {
  try {
    const localMonth = waterData.localDate.slice(3);
    const waterCount = await Water.create({ ...waterData, localMonth, user });
    return waterCount;
  } catch (error) {
    console.error('Error adding water:', error);
    throw error;
  }
};

export const getWaterCountId = async (id) => {
  try {
    const waterCount = await Water.findById(id);
    return waterCount;
  } catch (error) {
    console.error('Error getting water by ID:', error);
    throw error;
  }
};

export const deleteWaterCountId = async (id) => {
  try {
    const waterData = await Water.findByIdAndDelete(id);
    return waterData;
  } catch (error) {
    console.error('Error deleting water by ID:', error);
    throw error;
  }
};

export const updateWaterCountId = async (id, waterData) => {
  try {
    const localMonth = waterData.localDate.slice(3);
    const waterCount = await Water.findByIdAndUpdate(
      id,
      { ...waterData, localMonth },
      { new: true },
    );
    return waterCount;
  } catch (error) {
    console.error('Error updating water by ID:', error);
    throw error;
  }
};

export const getTotalDayWater = async (date, user) => {
  try {
    const allWaterCount = await Water.find({
      user: user.id,
      localDate: date.localDate,
    });

    let totalDay = 0;
    allWaterCount.forEach((i) => (totalDay += i.waterValue));

    if (totalDay >= Number(user.waterRate) * 1000)
      return { allWaterCount, feasibility: 100, completed: true };

    const feasibility = (totalDay / (Number(user.waterRate) * 1000)) * 100;
    return { allWaterCount, feasibility, completed: false };
  } catch (error) {
    console.error('Error getting total day water:', error);
    throw error;
  }
};

export const getTotalMonthWater = async (date, user) => {
  try {
    const allWaterCount = await Water.find({
      user: user.id,
      localMonth: date.localDate.slice(3),
    });

    const result = allWaterCount.reduce((acc, item) => {
      const key = item.localDate;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    const sortedKeys = Object.keys(result).sort();

    const sortedResult = {};
    sortedKeys.forEach((key) => {
      sortedResult[key] = result[key].sort((a, b) =>
        a.localTime.localeCompare(b.localTime),
      );
    });

    return sortedResult;
  } catch (error) {
    console.error('Error getting total month water:', error);
    throw error;
  }
};
