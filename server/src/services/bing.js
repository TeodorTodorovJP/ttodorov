import fetch from 'node-fetch';

const bing = async (waypoints) => {
  try {
    const { wp0, wp1, wp2, wp3, wp4 } = waypoints;

    if (!wp0 || !wp1) {
      return {
        result: null,
        error: 'You need at least two waypoints.',
      };
    }

    const wayPointThree = wp2 ? `&wp.2=${wp2}` : '';

    const wayPointFour = wp3 ? `&wp.3=${wp3}` : '';

    const wayPointFive = wp4 ? `&wp.4=${wp4}` : '';

    const response = await fetch(`http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=${wp0}&wp.1=${wp1}${wayPointThree}${wayPointFour}${wayPointFive}&key=AtlKbcY5JOQgeTDVDhWOpjWoEFRILOso6J09xvC2qZRffx-IWcX7fiDud7pzpXq7`);

    const resJSON = await response.json();
    return {
      result: resJSON.resourceSets[0].resources[0],
      error: null,
    };
  } catch (error) {
    return {
      result: null,
      error: 'Please enter valid waypoints.',
    };
  }
};

export default bing;
