import kpApi from './api.js'
const tmp = {
  requestTasks: 0
};

const kpLoading = opt => {
  if (!opt) {
    if (!tmp.requestTasks) {
      return;
    }
    --tmp.requestTasks;
  } else {
    if (opt.loading || opt.loading === undefined) {
      ++tmp.requestTasks;
    }
  }
  _checkLoading();
};

const _checkLoading = () => {
  if (tmp.requestTasks === 0) {
    kpApi.hideLoading();
  } else {
    kpApi.showLoading();
  }
};

module.exports = {
  kpLoading
};
