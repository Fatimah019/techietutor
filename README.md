# techietutor
Overview
By default, all requests to https://techietutor.herokuapp.com/v1 receive the v3 version of the REST API
Schema
        All API access is over HTTPS, and accessed from https://techietutor.herokuapp.com/v1. All data is sent and received as JSON.<
        Summary representations
        When you fetch a list of resources, the response includes a subset of the attributes for that resource. This is the "summary" representation of the resource. (Some attributes are computationally expensive for the API to provide. For performance reasons, the summary representation excludes those attributes. To obtain those attributes, fetch the "detailed" representation.)
        Example: When you get a list of repositories, you get the summary representation of each repository. Here, we fetch the list of repositories owned by the octokit organization:
        
        GET: tutor/category
        Detailed representations
        When you fetch an individual resource, the response typically includes all attributes for that resource. This is the "detailed"         representation of the resource. (Note that authorization sometimes influences the amount of detail included in the      representation.)
            Example: When you get an admin information, you get the detailed representation
    
        GET: category/subjects/Maths
        
        Root endpoint
        You can issue a GET request to the root endpoint to get all the endpoint categories that the REST API v1 supports:
        GET: https://api.github.com/v1
        
        Client errors
        There are three possible types of client errors on API calls that receive request bodies:
        
        
