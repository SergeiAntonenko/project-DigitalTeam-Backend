import {
  addWater,
  deleteWaterCountId,
  updateWaterCountId,
  getTotalDayWater,
  getTotalMonthWater,
} from '../services/waterServices.js';

export const addWaterController = async (req, res, next) => {
  try {
    console.log(req.body);
    const waterCount = await addWater(req.body, req.user);

    res.status(201).json({
      msg: 'Successfully created!',
      waterCount: {
        _id: waterCount.id,
        localMonth: waterCount.localMonth,
        localDate: waterCount.localDate,
        localTime: waterCount.localTime,
        waterValue: waterCount.waterValue,
        user: waterCount.user,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const deleteWaterController = async (req, res, next) => {
  try {
    const waterCount = await deleteWaterCountId(req.water.id);

    res.status(200).json({
      msg: 'Successfully deleted!',
      waterCount: {
        _id: waterCount.id,
        localMonth: waterCount.localMonth,
        localDate: waterCount.localDate,
        localTime: waterCount.localTime,
        waterValue: waterCount.waterValue,
        user: waterCount.user,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const updateWaterController = async (req, res, next) => {
  try {
    const waterCount = await updateWaterCountId(req.water.id, req.body);

    res.status(201).json({
      msg: 'Successfully updated!',
      waterCount: {
        _id: waterCount.id,
        localMonth: waterCount.localMonth,
        localDate: waterCount.localDate,
        localTime: waterCount.localTime,
        waterValue: waterCount.waterValue,
        user: waterCount.user,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getTotalDayWaterController = async (req, res, next) => {
  try {
    const { allWaterCount, progress, isGoalAchieved } = await getTotalDayWater(
      req.body,
      req.user,
    );

    res.status(200).json({
      msg: 'You get your total amount of water for this day!',
      waterRate: {
        progress,
        isGoalAchieved,
      },
      waterCount: allWaterCount,
    });
  } catch (e) {
    next(e);
  }
};

export const getTotalMonthWaterController = async (req, res, next) => {
  try {
    const allWaterCount = await getTotalMonthWater(req.body, req.user);

    res.status(200).json({
      msg: 'You get your total amount of water for this month!',
      waterCount: allWaterCount,
    });
  } catch (e) {
    next(e);
  }
};