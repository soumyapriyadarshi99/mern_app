const Transaction = require("../models/Transaction");

const getMonthNumber = (monthName) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.indexOf(monthName) + 1;
};

const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month = "" } = req.query;
    const query = {};
    if (month) {
      const monthNumber = getMonthNumber(month);
      const year = 2020;
      const startDate = new Date(
        Date.UTC(year, monthNumber - 1, 1, 0, 0, 0, 0)
      );
      const endDate = new Date(Date.UTC(year, monthNumber, 1, 0, 0, 0, 0));
      query.dateOfSale = { $gte: startDate, $lt: endDate };
    }

    if (search) {
      query.$or = [{ category: { $regex: search, $options: "i" } }];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const totalCount = await Transaction.countDocuments(query);

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({
      transactions,
      totalPages,
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

module.exports = { getTransactions };
