<template>
    <div style="width: 100%; height: 300px;" ref="_echatr"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    props: ["data", "height"],
    data () {
        return {
            myChart: null,
            style: {
                "color": [
                    "#FFCC55",
                    "#79E1AC",
                    "#33CCFF",
                    "#6699FF",
                    "#8877DD",
                    '#C2554C',
                    '#FF1E6D',
                    '#FF7E1E'
                ],
                "backgroundColor": "rgba(0, 0, 0, 0)",
                "textStyle": {},
                "title": {
                    "textStyle": {
                        "color": "#A7FFFE"
                    },
                    "subtextStyle": {
                        "color": "#aaa"
                    }
                },
                "line": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 1
                        }
                    },
                    "lineStyle": {
                        "normal": {
                            "width": 2
                        }
                    },
                    "symbolSize": 4,
                    "symbol": "emptyCircle",
                    "smooth": false
                },
                "radar": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 1
                        }
                    },
                    "lineStyle": {
                        "normal": {
                            "width": 2
                        }
                    },
                    "symbolSize": 4,
                    "symbol": "emptyCircle",
                    "smooth": false
                },
                "bar": {
                    "itemStyle": {
                        "normal": {
                            "barBorderWidth": 0,
                            "barBorderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "barBorderWidth": 0,
                            "barBorderColor": "#dcdfe6"
                        }
                    }
                },
                "pie": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "scatter": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "boxplot": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "parallel": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "sankey": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "funnel": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "gauge": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        },
                        "emphasis": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    }
                },
                "candlestick": {
                    "itemStyle": {
                        "normal": {
                            "color": "#c23531",
                            "color0": "#314656",
                            "borderColor": "#c23531",
                            "borderColor0": "#314656",
                            "borderWidth": 1
                        }
                    }
                },
                "graph": {
                    "itemStyle": {
                        "normal": {
                            "borderWidth": 0,
                            "borderColor": "#dcdfe6"
                        }
                    },
                    "lineStyle": {
                        "normal": {
                            "width": 1,
                            "color": "#aaa"
                        }
                    },
                    "symbolSize": 4,
                    "symbol": "emptyCircle",
                    "smooth": false,
                    "color": [
                        "#409eff",
                        "#67c23a",
                        "#e6a23c",
                        "#f56c6c",
                        "#909399"
                    ],
                    "label": {
                        "normal": {
                            "textStyle": {
                                "color": "#606266"
                            }
                        }
                    }
                },
                "map": {
                    "itemStyle": {
                        "normal": {
                            "areaColor": "#eee",
                            "borderColor": "#444",
                            "borderWidth": 0.5
                        },
                        "emphasis": {
                            "areaColor": "rgba(255,215,0,0.8)",
                            "borderColor": "#444",
                            "borderWidth": 1
                        }
                    },
                    "label": {
                        "normal": {
                            "textStyle": {
                                "color": "#000"
                            }
                        },
                        "emphasis": {
                            "textStyle": {
                                "color": "rgb(100,0,0)"
                            }
                        }
                    }
                },
                "geo": {
                    "itemStyle": {
                        "normal": {
                            "areaColor": "#eee",
                            "borderColor": "#444",
                            "borderWidth": 0.5
                        },
                        "emphasis": {
                            "areaColor": "rgba(255,215,0,0.8)",
                            "borderColor": "#444",
                            "borderWidth": 1
                        }
                    },
                    "label": {
                        "normal": {
                            "textStyle": {
                                "color": "#000"
                            }
                        },
                        "emphasis": {
                            "textStyle": {
                                "color": "rgb(100,0,0)"
                            }
                        }
                    }
                },
                "categoryAxis": {
                    "axisLine": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisTick": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#84868e"
                        }
                    },
                    "splitLine": {
                        "show": false,
                        "lineStyle": {
                            "color": [
                                "#ccc"
                            ]
                        }
                    },
                    "splitArea": {
                        "show": false,
                        "areaStyle": {
                            "color": [
                                "rgba(250,250,250,0.3)",
                                "rgba(200,200,200,0.3)"
                            ]
                        }
                    }
                },
                "valueAxis": {
                    "axisLine": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisTick": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#84868e"
                        }
                    },
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "color": [
                                "#ccc"
                            ]
                        }
                    },
                    "splitArea": {
                        "show": false,
                        "areaStyle": {
                            "color": [
                                "rgba(250,250,250,0.3)",
                                "rgba(200,200,200,0.3)"
                            ]
                        }
                    }
                },
                "logAxis": {
                    "axisLine": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisTick": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#84868e"
                        }
                    },
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "color": [
                                "#ccc"
                            ]
                        }
                    },
                    "splitArea": {
                        "show": false,
                        "areaStyle": {
                            "color": [
                                "rgba(250,250,250,0.3)",
                                "rgba(200,200,200,0.3)"
                            ]
                        }
                    }
                },
                "timeAxis": {
                    "axisLine": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisTick": {
                        "show": true,
                        "lineStyle": {
                            "color": "#84868e"
                        }
                    },
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#84868e"
                        }
                    },
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "color": [
                                "#ccc"
                            ]
                        }
                    },
                    "splitArea": {
                        "show": false,
                        "areaStyle": {
                            "color": [
                                "rgba(250,250,250,0.3)",
                                "rgba(200,200,200,0.3)"
                            ]
                        }
                    }
                },
                "toolbox": {
                    "iconStyle": {
                        "normal": {
                            "borderColor": "#999"
                        },
                        "emphasis": {
                            "borderColor": "#666"
                        }
                    }
                },
                "legend": {
                    "textStyle": {
                        "color": "#84868e"
                    }
                },
                "tooltip": {
                    "axisPointer": {
                        "lineStyle": {
                            "color": "#ccc",
                            "width": 1
                        },
                        "crossStyle": {
                            "color": "#ccc",
                            "width": 1
                        }
                    }
                },
                "timeline": {
                    "lineStyle": {
                        "color": "#293c55",
                        "width": 1
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#293c55",
                            "borderWidth": 1
                        },
                        "emphasis": {
                            "color": "#a9334c"
                        }
                    },
                    "controlStyle": {
                        "normal": {
                            "color": "#293c55",
                            "borderColor": "#293c55",
                            "borderWidth": 0.5
                        },
                        "emphasis": {
                            "color": "#293c55",
                            "borderColor": "#293c55",
                            "borderWidth": 0.5
                        }
                    },
                    "checkpointStyle": {
                        "color": "#e43c59",
                        "borderColor": "rgba(194,53,49, 0.5)"
                    },
                    "label": {
                        "normal": {
                            "textStyle": {
                                "color": "#293c55"
                            }
                        },
                        "emphasis": {
                            "textStyle": {
                                "color": "#293c55"
                            }
                        }
                    }
                },
                "visualMap": {
                    "color": [
                        "#bf444c",
                        "#d88273",
                        "#f6efa6"
                    ]
                },
                "dataZoom": {
                    "backgroundColor": "rgba(47,69,84,0)",
                    "dataBackgroundColor": "rgba(47,69,84,0.3)",
                    "fillerColor": "rgba(167,183,204,0.4)",
                    "handleColor": "#a7b7cc",
                    "handleSize": "100%",
                    "textStyle": {
                        "color": "#84868e"
                    }
                },
                "markPoint": {
                    "label": {
                        "normal": {
                            "textStyle": {
                                "color": "#606266"
                            }
                        },
                        "emphasis": {
                            "textStyle": {
                                "color": "#606266"
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        init() {
            this.$refs._echatr.style.height = this.height || "300px";
            echarts.registerTheme('customed', this.style);
            this.myChart = echarts.init(this.$refs._echatr, 'customed');
            // 指定图表的配置项和数据
            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(this.data);
        }
    },
    mounted: function () {
        var that = this;
        this.init();

        window.addEventListener("resize", function() {
            that.myChart.resize();
        });
    },
    watch: {
        data: function (e) {
            var that = this;
            this.myChart.setOption(e);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
