export default [
    {
        show(row, extra) {
            return true;
        },
        tag: 'el-button',
        type: 'text',
        text: '详情',
        click(row, extra) {
            this.goto({
                path: 'detail',
                query: {
                    rowguid: row.procode
                }
            })
        }
    }, {
        show(row, extra) {
            return (
                row.shbj !== '1'
            );
        },
        tag: 'el-button',
        type: 'text',
        text: '编辑',
        click(row, extra) {
            this.goto({
                path: 'form',
                query: {
                    rowguid: row.procode
                }
            })
        }
    }
]
