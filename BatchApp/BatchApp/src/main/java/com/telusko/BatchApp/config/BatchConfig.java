package com.telusko.BatchApp.config;

import com.telusko.BatchApp.model.Customer;
import com.telusko.BatchApp.repository.ICustomerRepo;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class BatchConfig {

    @Autowired
    private ICustomerRepo customerRepo;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private PlatformTransactionManager platformTransactionManager;

    //ItemReader
    @Bean
    public FlatFileItemReader<Customer> itemReader(){
        FlatFileItemReader<Customer> reader = new FlatFileItemReader<>();
        reader.setResource(new FileSystemResource("src/main/resources/customers.csv"));
        reader.setName("CSV Reader");
        reader.setLinesToSkip(1);
        reader.setLineMapper(lineMapper());
        return reader;
    }

    private LineMapper<Customer> lineMapper() {
        DefaultLineMapper<Customer> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(",");  // Specify the delimiter
        lineTokenizer.setStrict(false); // Don't be very strict, even if there is any null or empty field, ignore that.
        lineTokenizer.setNames(
                "customerId",
                "firstName",
                "lastName",
                "email",
                "city",
                "state",
                "country",
                "zipcode"
        );
        BeanWrapperFieldSetMapper<Customer> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Customer.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }

    //ItemProcessor
    @Bean
    public CustomerProcessor processCustomerData(){
        return new CustomerProcessor();
    }

    //ItemWriter
    @Bean
    public RepositoryItemWriter<Customer> itemWriter(){
        RepositoryItemWriter<Customer> writer = new RepositoryItemWriter<>();
        writer.setRepository(customerRepo);
        writer.setMethodName("save");
        return writer;
    }

    //Step
    @Bean
    public Step step(){
        return new StepBuilder("step-1",jobRepository)
                .<Customer,Customer>chunk(10, platformTransactionManager)
                .reader(itemReader())
                .processor(processCustomerData())
                .writer(itemWriter())
                .build();
    }

    //Job
    @Bean
    public Job job(){
        return new JobBuilder("customer-import",jobRepository)
                .start(step())
                .build();
    }

}
