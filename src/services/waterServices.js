import { Water } from '../db/models/waterModel.js';

export const localDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
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
    throw error;
  }
};

export const getWaterCountId = async (id) => {
  try {
    const waterCount = await Water.findById(id);
    return waterCount;
  } catch (error) {
    throw error;
  }
};

export const deleteWaterCountId = async (id) => {
  try {
    const waterData = await Water.findByIdAndDelete(id);
    return waterData;
  } catch (error) {
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
    throw error;
  }
};

export const getTotalDayWater = async (date, user) => {
  try {
    const allWaterCount = await Water.find({
      user: user._id,
      localDate: date,
    });

    let totalDay = 0;
    allWaterCount.forEach((i) => {
      totalDay += i.waterValue;
    });

    return { allWaterCount, totalDay };
  } catch (error) {
    throw error;
  }
};

export const getTotalMonthWater = async (month, user) => {
  try {
    const allWaterCount = await Water.find({
      user: user._id,
      localMonth: month,
    });

    const totalMonth = allWaterCount.reduce(
      (acc, item) => acc + item.waterValue,
      0,
    );

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
    const dailyTotals = {};

    sortedKeys.forEach((key) => {
      const sortedItems = result[key].sort((a, b) =>
        a.localTime.localeCompare(b.localTime),
      );
      sortedResult[key] = sortedItems;

      dailyTotals[key] = sortedItems.reduce(
        (acc, item) => acc + item.waterValue,
        0,
      );
    });

    return { totalMonth, waterCount: sortedResult, dailyTotals };
  } catch (error) {
    throw error;
  }
};
