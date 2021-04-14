const db = require("../models/db");

module.exports.getFilterData = (req, res, next) => {
    var allVal = [];
    function buildConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        if (typeof params.industry != "undefined") {
            conditions.push("LI_industry LIKE ?");
            values.push("%" + params.industry + "%");
        }

        if (typeof params.title != "undefined") {
            conditions.push("job_title LIKE ?");
            values.push("%" + params.title + "%");
        }

        if (typeof params.employeeSize != "undefined") {
            conditions.push("emp_range LIKE ?");
            values.push("%" + params.employeeSize + "%");
        }

        if (typeof params.naicsCode != "undefined") {
            conditions.push("naics_code LIKE ?");
            values.push("%" + params.naicsCode + "%");
        }

        if (typeof params.sicCode != "undefined") {
            conditions.push("sic_code LIKE ?");
            values.push("%" + params.sicCode + "%");
        }

        return {
            where: conditions.length ? conditions.join(" and ") : "1",
            values: values,
        };
    }

    // for country
    function countryConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        for (const country of params.countries) {
            if (typeof params.countries != "undefined") {
                conditions.push("contact.Country LIKE ?");
                values.push("%" + country + "%");
                allVal.push("%" + country + "%");
            }
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    // for industry
    function industryConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        // for (const industry of params.industry) {
        //   if (typeof params.country != 'undefined') {
        //       conditions.push("LI_industry LIKE ?");
        //       values.push("%" + industry + "%");
        //       allVal.push("%" + industry + "%");
        //   }
        // }

        if (typeof params.industries != "undefined") {
            for (const industry of params.industries) {
                conditions.push("LI_industry LIKE ?");
                values.push("%" + industry + "%");
                allVal.push("%" + industry + "%");
            }
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    // for Employee range
    function employeeRangeConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        // for (const empRange of params.employeeSize) {
        //   if (typeof params.employeeSize != 'undefined') {
        //       conditions.push("emp_range LIKE ?");
        //       values.push("%" + empRange + "%");
        //       allVal.push("%" + empRange + "%");
        //   }
        // }

        if (typeof params.employeeSize != "undefined") {
            for (const empRange of params.employeeSize) {
                conditions.push("emp_range LIKE ?");
                values.push("%" + empRange + "%");
                allVal.push("%" + empRange + "%");
            }
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    // for job title
    function jobTitleConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        if (typeof params.title != "undefined") {
            for (const title of params.title) {
                conditions.push("job_title LIKE ?");
                values.push("%" + title + "%");
                allVal.push("%" + title + "%");
            }
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    // for job_level
    function jobLevelConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        if (typeof params.jobLevel != "undefined") {
            for (const jobLevel of params.jobLevel) {
                conditions.push("job_level LIKE ?");
                values.push("%" + jobLevel + "%");
                allVal.push("%" + jobLevel + "%");
            }
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    // for job function
    function jobFunctionConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        if (typeof params.jobFunction != "undefined") {
            for (const jobFunction of params.jobFunction) {
                conditions.push("job_function LIKE ?");
                values.push("%" + jobFunction + "%");
                allVal.push("%" + jobFunction + "%");
            }
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    function deadConditions(params) {
        var conditions = [];
        var values = [];
        var conditionsStr;

        if (typeof params.dead != "undefined") {
            conditions.push("qa_reason not REGEXP ?");
            values.push(params.dead + "+");
            allVal.push(params.dead + "+");
        }

        return {
            where: conditions.length
                ? "(".concat(conditions.join(" or ")).concat(")")
                : "1",
            values: values,
        };
    }

    var conditions = buildConditions(req.body);
    var countryChack = countryConditions(req.body);
    var industryCheck = industryConditions(req.body);
    var empCheck = employeeRangeConditions(req.body);
    var jobTitleCheck = jobTitleConditions(req.body);
    var jobLevelCheck = jobLevelConditions(req.body);
    var jobFunctionCheck = jobFunctionConditions(req.body);
    var deadCheck = deadConditions(req.body);

    console.log(industryCheck.length);

    if (req.body.dead) {
        sql =
            "select contact.update_date,first_name, last_name, job_title ,company_name, website, email_address,contact.work_phone, contact.address_l1, contact.city, contact.State, contact.Zip_code, contact.Country, emp_range, LI_industry, vv_disposition, qa_status,qa_reason, LI_link, LI_company_link from contact inner join company on contact.c_id = company.id inner join email on email.contact_id = contact.id inner join quality_check on quality_check.contact_id = contact.id WHERE " +
            countryChack.where +
            " and " +
            industryCheck.where +
            " and " +
            empCheck.where +
            " and " +
            jobTitleCheck.where +
            " and " +
            jobLevelCheck.where +
            " and " +
            jobFunctionCheck.where +
            ` Limit ${req.body.limit}`;
    } else {
        sql =
            "select contact.update_date,first_name, last_name, job_title ,company_name, website, email_address,contact.work_phone, contact.address_l1, contact.city, contact.State, contact.Zip_code, contact.Country, emp_range, LI_industry, vv_disposition, qa_status,qa_reason, LI_link, LI_company_link from contact inner join company on contact.c_id = company.id inner join email on email.contact_id = contact.id inner join quality_check on quality_check.contact_id = contact.id WHERE " +
            countryChack.where +
            " and " +
            industryCheck.where +
            " and " +
            empCheck.where +
            " and " +
            jobTitleCheck.where +
            " and " +
            jobLevelCheck.where +
            " and " +
            jobFunctionCheck.where +
            " and " +
            deadCheck.where +
            ` Limit ${req.body.limit}`;
    }

    db.query(sql, allVal, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    });
};
