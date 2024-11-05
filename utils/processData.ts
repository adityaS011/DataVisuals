export function processData(rawData: any[]) {
  const aggregatedData = rawData.reduce((acc, row) => {
    const { Day, Age, Gender, ...features } = row;

    Object.keys(features).forEach((feature) => {
      if (!acc[feature]) acc[feature] = {};
      if (!acc[feature][Day]) acc[feature][Day] = 0;

      acc[feature][Day] += parseInt(features[feature]);
    });

    return acc;
  }, {});

  return aggregatedData;
}
