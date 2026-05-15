package com.ciart.blogzio.config;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.type.BasicType;
import org.hibernate.type.StandardBasicTypes;

public class BigmFunctionContributor implements FunctionContributor {
    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        BasicType<Double> doubleType = functionContributions.getTypeConfiguration()
                .getBasicTypeRegistry().resolve(StandardBasicTypes.DOUBLE);

        functionContributions.getFunctionRegistry()
                .registerPattern("bigm_similarity", "bigm_similarity(?1, ?2)", doubleType);
    }
}
